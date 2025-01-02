import { Configuration, EntityApi, EntityCreate, EntityResponse } from './api/generated/api';
import { moniteLogger } from '@/lib/logger';

export class MoniteService {
  private entityApi: EntityApi;

  constructor(apiUrl: string, clientId: string, clientSecret: string) {
    if (!apiUrl) {
      throw new Error('Monite API URL is required');
    }
    if (!clientId) {
      throw new Error('Monite Client ID is required');
    }
    if (!clientSecret) {
      throw new Error('Monite Client Secret is required');
    }

    const config = new Configuration({
      basePath: apiUrl,
      username: clientId,
      password: clientSecret,
    });

    this.entityApi = new EntityApi(config);
  }

  async createEntity(data: EntityCreate): Promise<EntityResponse> {
    try {
      moniteLogger.debug('Creating entity with data', { data });
      
      // Validate required fields
      if (!data.email) {
        throw new Error('Email is required');
      }
      if (!data.type) {
        throw new Error('Entity type is required');
      }
      if (!data.address) {
        throw new Error('Address is required');
      }
      if (!data.address.country) {
        throw new Error('Country is required');
      }

      // Additional validation for organization type
      if (data.type === 'organization') {
        if (!data.organization?.legal_name) {
          throw new Error('Legal name is required for organizations');
        }
      }

      // Additional validation for individual type
      if (data.type === 'individual') {
        if (!data.individual?.first_name) {
          throw new Error('First name is required for individuals');
        }
      }

      const response = await this.entityApi.createEntity({ entityCreate: data });
      moniteLogger.info('Entity created successfully', { entityId: response.data.id });
      return response.data;
    } catch (error) {
      moniteLogger.error('Failed to create entity', { error });
      if (error instanceof Error) {
        throw new Error(`Failed to create Monite entity: ${error.message}`);
      }
      throw new Error('Failed to create Monite entity');
    }
  }

  async getEntity(entityId: string): Promise<EntityResponse> {
    try {
      moniteLogger.debug('Fetching entity', { entityId });
      const response = await this.entityApi.getEntity({ entityId });
      moniteLogger.info('Entity fetched successfully', { entityId });
      return response.data;
    } catch (error) {
      moniteLogger.error('Failed to fetch entity', { error, entityId });
      if (error instanceof Error) {
        throw new Error(`Failed to fetch Monite entity: ${error.message}`);
      }
      throw new Error('Failed to fetch Monite entity');
    }
  }
}
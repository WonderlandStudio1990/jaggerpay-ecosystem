import { MoniteApiClient } from './api/client';
import { MoniteEntity, MoniteEntityCreate, MoniteError } from '@/lib/types';

export class MoniteService {
  private readonly apiClient: MoniteApiClient;
  private static instance: MoniteService;

  constructor(
    baseURL: string,
    clientId: string,
    clientSecret: string
  ) {
    this.validateConfig(baseURL, clientId, clientSecret);
    this.apiClient = new MoniteApiClient({
      baseURL,
      clientId,
      clientSecret,
      timeout: 10000,
      maxRetries: 3
    });
  }

  private validateConfig(baseURL: string, clientId: string, clientSecret: string): void {
    if (!baseURL || !clientId || !clientSecret) {
      const error = new Error('Missing required configuration') as MoniteError;
      error.code = 'INVALID_CONFIG';
      error.status = 500;
      throw error;
    }
  }

  public static getInstance(
    baseURL?: string,
    clientId?: string,
    clientSecret?: string
  ): MoniteService {
    if (!MoniteService.instance) {
      if (!baseURL || !clientId || !clientSecret) {
        throw new Error('MoniteService not initialized. Please provide configuration.');
      }
      MoniteService.instance = new MoniteService(baseURL, clientId, clientSecret);
    }
    return MoniteService.instance;
  }

  async createEntity(params: MoniteEntityCreate): Promise<MoniteEntity> {
    try {
      const response = await this.apiClient.request<MoniteEntity>({
        method: 'POST',
        url: '/v1/entities',
        data: params
      });

      return this.validateEntityResponse(response);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async getEntity(entityId: string): Promise<MoniteEntity> {
    try {
      const response = await this.apiClient.request<MoniteEntity>({
        method: 'GET',
        url: `/v1/entities/${entityId}`
      });

      return this.validateEntityResponse(response);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async updateEntity(entityId: string, params: Partial<MoniteEntityCreate>): Promise<MoniteEntity> {
    try {
      const response = await this.apiClient.request<MoniteEntity>({
        method: 'PATCH',
        url: `/v1/entities/${entityId}`,
        data: params
      });

      return this.validateEntityResponse(response);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async deleteEntity(entityId: string): Promise<void> {
    try {
      await this.apiClient.request({
        method: 'DELETE',
        url: `/v1/entities/${entityId}`
      });
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async listEntities(): Promise<{ data: MoniteEntity[] }> {
    try {
      const response = await this.apiClient.request<{ data: MoniteEntity[] }>({
        method: 'GET',
        url: '/v1/entities'
      });

      if (!response || !Array.isArray(response.data)) {
        throw this.createError('Invalid response format', 'INVALID_RESPONSE', 500);
      }

      return response;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  private validateEntityResponse(response: any): MoniteEntity {
    if (!response || !response.id || !response.type) {
      throw this.createError('Invalid entity response', 'INVALID_ENTITY', 500);
    }
    return response;
  }

  private handleApiError(error: any): MoniteError {
    if (error instanceof Error) {
      const moniteError = error as MoniteError;
      moniteError.code = moniteError.code || 'UNKNOWN_ERROR';
      moniteError.status = moniteError.status || 500;
      return moniteError;
    }

    return this.createError(
      error?.message || 'An unknown error occurred',
      error?.code || 'UNKNOWN_ERROR',
      error?.status || 500
    );
  }

  private createError(message: string, code: string, status: number): MoniteError {
    const error = new Error(message) as MoniteError;
    error.code = code;
    error.status = status;
    return error;
  }
}
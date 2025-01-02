import { moniteLogger } from '@/lib/logger';
import { MoniteEntity, MoniteEntityCreate } from './types';

export class MoniteService {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private apiUrl: string;
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_MONITE_API_URL || 'https://api.sandbox.monite.com';
    this.clientId = process.env.NEXT_PUBLIC_MONITE_CLIENT_ID || '';
    this.clientSecret = process.env.NEXT_PUBLIC_MONITE_CLIENT_SECRET || '';

    if (!this.apiUrl) {
      throw new Error('Missing NEXT_PUBLIC_MONITE_API_URL');
    }
    if (!this.clientId) {
      throw new Error('Missing NEXT_PUBLIC_MONITE_CLIENT_ID');
    }
    if (!this.clientSecret) {
      throw new Error('Missing NEXT_PUBLIC_MONITE_CLIENT_SECRET');
    }
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const response = await fetch(`${this.apiUrl}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    const token = data.access_token as string;
    if (!token) {
      throw new Error('No access token in response');
    }

    this.accessToken = token;
    this.tokenExpiry = Date.now() + ((data.expires_in || 3600) * 1000);
    return token;
  }

  async createEntity(data: MoniteEntityCreate): Promise<MoniteEntity> {
    try {
      moniteLogger.info('Creating entity', { data });
      const token = await this.getAccessToken();

      const response = await fetch(`${this.apiUrl}/v1/entities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create entity');
      }

      const entity = await response.json();
      moniteLogger.info('Entity created successfully', { entityId: entity.id });
      return entity;
    } catch (error) {
      moniteLogger.error('Failed to create entity', { error });
      throw error;
    }
  }

  async getEntity(id: string): Promise<MoniteEntity> {
    try {
      moniteLogger.info('Getting entity', { entityId: id });
      const token = await this.getAccessToken();

      const response = await fetch(`${this.apiUrl}/v1/entities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get entity');
      }

      return response.json();
    } catch (error) {
      moniteLogger.error('Failed to get entity', { error });
      throw error;
    }
  }

  async listEntities(): Promise<{ data: MoniteEntity[] }> {
    try {
      moniteLogger.info('Listing entities');
      const token = await this.getAccessToken();

      const response = await fetch(`${this.apiUrl}/v1/entities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to list entities');
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      moniteLogger.error('Failed to list entities', { error });
      throw error;
    }
  }

  async updateEntity(id: string, data: Partial<MoniteEntityCreate>): Promise<MoniteEntity> {
    try {
      moniteLogger.info('Updating entity', { id, data });
      const token = await this.getAccessToken();

      const response = await fetch(`${this.apiUrl}/v1/entities/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update entity');
      }

      return response.json();
    } catch (error) {
      moniteLogger.error('Failed to update entity', { error });
      throw error;
    }
  }

  async deleteEntity(id: string): Promise<void> {
    try {
      moniteLogger.info('Deleting entity', { id });
      const token = await this.getAccessToken();

      const response = await fetch(`${this.apiUrl}/v1/entities/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete entity');
      }
    } catch (error) {
      moniteLogger.error('Failed to delete entity', { error });
      throw error;
    }
  }
}
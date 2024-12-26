import type { MoniteSDK, CreatePaymentLinkRequest } from '@monite/sdk-api';
import { MoniteAPIService } from '../api/MoniteAPIService';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';
import * as ReceivableTransformer from '../api/transformers/ReceivableTransformer';

export class ReceivableService {
  static async getReceivables() {
    console.log('Fetching receivables from Monite');
    const api = await MoniteAPIService.getInstance();
    const sdk = api.getSDK() as MoniteSDK;
    
    try {
      const response = await sdk.api.receivable.getAll();
      await MoniteMonitoringService.logApiCall('receivable.getAll', true);
      return response.data.map(receivable => ReceivableTransformer.fromMonite(receivable));
    } catch (error) {
      console.error('Error fetching receivables:', error);
      await MoniteMonitoringService.logApiCall('receivable.getAll', false, { error });
      throw error;
    }
  }

  static async createReceivable(data: CreatePaymentLinkRequest) {
    console.log('Creating receivable in Monite');
    const api = await MoniteAPIService.getInstance();
    const sdk = api.getSDK() as MoniteSDK;
    
    try {
      const response = await sdk.api.receivable.create(data);
      await MoniteMonitoringService.logApiCall('receivable.create', true);
      return ReceivableTransformer.fromMonite(response);
    } catch (error) {
      console.error('Error creating receivable:', error);
      await MoniteMonitoringService.logApiCall('receivable.create', false, { error });
      throw error;
    }
  }
}
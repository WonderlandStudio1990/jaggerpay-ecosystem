import { monitoringLogger } from './logger';
import { metricsCollector } from './metrics';

export interface ApiMonitorConfig {
  name: string;
  slowRequestThreshold?: number;
}

export interface ApiRequestInfo {
  method: string;
  url: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface ApiResponseInfo {
  status: number;
  duration: number;
  data?: unknown;
}

export class ApiMonitor {
  private readonly name: string;
  private readonly slowRequestThreshold: number;

  constructor(config: ApiMonitorConfig) {
    this.name = config.name;
    this.slowRequestThreshold = config.slowRequestThreshold || 1000; // 1 second default
  }

  async monitorRequest<T>(
    requestInfo: ApiRequestInfo,
    operation: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now();
    
    try {
      const result = await operation();
      const duration = Date.now() - startTime;

      // Record metrics
      this.recordMetrics(requestInfo, { status: 200, duration });

      // Log request details
      if (duration > this.slowRequestThreshold) {
        monitoringLogger.warn({
          message: 'Slow API request detected',
          api: this.name,
          method: requestInfo.method,
          url: requestInfo.url,
          duration,
          threshold: this.slowRequestThreshold
        });
      } else {
        monitoringLogger.debug({
          message: 'API request completed',
          api: this.name,
          method: requestInfo.method,
          url: requestInfo.url,
          duration
        });
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const status = error instanceof Error && 'status' in error 
        ? (error as { status: number }).status 
        : 500;

      // Record error metrics
      this.recordMetrics(requestInfo, { status, duration });

      // Log error details
      monitoringLogger.error({
        message: 'API request failed',
        api: this.name,
        method: requestInfo.method,
        url: requestInfo.url,
        duration,
        error: error instanceof Error ? error : new Error(String(error))
      });

      throw error;
    }
  }

  private recordMetrics(request: ApiRequestInfo, response: ApiResponseInfo): void {
    // Record request duration
    metricsCollector.record({
      name: 'api_request_duration',
      value: response.duration,
      tags: {
        api: this.name,
        method: request.method,
        status: response.status.toString()
      }
    });

    // Record request count
    metricsCollector.record({
      name: 'api_request_count',
      value: 1,
      tags: {
        api: this.name,
        method: request.method,
        status: response.status.toString()
      }
    });

    // Record slow requests
    if (response.duration > this.slowRequestThreshold) {
      metricsCollector.record({
        name: 'api_slow_request_count',
        value: 1,
        tags: {
          api: this.name,
          method: request.method
        }
      });
    }
  }
}

export default new ApiMonitor({ name: 'default' }); 
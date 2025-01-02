import { useEffect, useRef } from 'react';
import { MonitoringService } from '@/lib/monitoring';

export const useMonitoring = (componentName: string) => {
  const monitoring = MonitoringService.getInstance();
  const mountTime = useRef<number>(0);

  useEffect(() => {
    mountTime.current = performance.now();

    return () => {
      const duration = performance.now() - mountTime.current;
      monitoring.trackRenderTime(componentName, duration);
    };
  }, [componentName]);

  return {
    trackInteraction: (action: string) => monitoring.trackInteraction(componentName, action),
    trackError: (type: string, message: string) => monitoring.trackError(`${componentName}.${type}`, message),
    trackApiCall: (endpoint: string, duration: number, status: number) => 
      monitoring.trackApiCall(`${componentName}.${endpoint}`, duration, status),
    trackFormSubmission: (formName: string, success: boolean) => 
      monitoring.trackFormSubmission(`${componentName}.${formName}`, success),
  };
}; 
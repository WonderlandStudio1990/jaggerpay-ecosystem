# WonderPay Frontend Monitoring Setup

## Checkpoint Overview
This checkpoint documents the setup of frontend monitoring using Graphite and StatsD for WonderPay.

### Current Stack
- Graphite for metrics storage
- StatsD for metrics collection
- Grafana for visualization
- Custom monitoring service for frontend tracking

## Setup Instructions

### 1. Docker Compose Configuration
Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  graphite:
    image: graphiteapp/graphite-statsd:latest
    ports:
      - "2003-2004:2003-2004"
      - "2023-2024:2023-2024"
      - "8125:8125/udp"
      - "8126:8126"
    volumes:
      - graphite_data:/opt/graphite/storage
      - graphite_conf:/opt/graphite/conf
    environment:
      - GRAPHITE_TIME_ZONE=America/Los_Angeles

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3005:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=wonderpay
      - GF_USERS_ALLOW_SIGN_UP=false
    depends_on:
      - graphite

volumes:
  graphite_data:
  graphite_conf:
  grafana_data:
```

### 2. Dependencies
Install required packages:
```bash
npm install graphite statsd-client
```

### 3. Monitoring Service
Create `src/lib/monitoring.ts`:
```typescript
import StatsD from 'statsd-client';

export class MonitoringService {
  private static instance: MonitoringService;
  private client: StatsD;

  private constructor() {
    this.client = new StatsD({
      host: 'localhost',
      port: 8125,
      prefix: 'wonderpay.frontend.'
    });
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  // Track page load time
  public trackPageLoad(page: string, duration: number) {
    this.client.timing(`page.${page}.load`, duration);
  }

  // Track API call duration
  public trackApiCall(endpoint: string, duration: number, status: number) {
    this.client.timing(`api.${endpoint}.duration`, duration);
    this.client.increment(`api.${endpoint}.status.${status}`);
  }

  // Track user interactions
  public trackInteraction(component: string, action: string) {
    this.client.increment(`interaction.${component}.${action}`);
  }

  // Track errors
  public trackError(type: string, message: string) {
    this.client.increment(`error.${type}`);
    console.error(`[${type}] ${message}`);
  }

  // Track component render time
  public trackRenderTime(component: string, duration: number) {
    this.client.timing(`component.${component}.render`, duration);
  }

  // Track form submissions
  public trackFormSubmission(form: string, success: boolean) {
    this.client.increment(`form.${form}.${success ? 'success' : 'failure'}`);
  }

  // Track navigation
  public trackNavigation(from: string, to: string) {
    this.client.increment(`navigation.${from}.to.${to}`);
  }
}
```

### 4. React Hook
Create `src/hooks/use-monitoring.ts`:
```typescript
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
```

## Metrics Being Tracked
1. Page Load Times
2. API Call Durations
3. User Interactions
4. Error Occurrences
5. Component Render Times
6. Form Submissions
7. Navigation Events

## Access Points
- Graphite: http://localhost:2003
- Grafana: http://localhost:3005 (admin/wonderpay)
- StatsD: UDP port 8125

## Next Steps
1. Set up Grafana dashboards for:
   - Page performance metrics
   - API call monitoring
   - Error tracking
   - User interaction analytics
2. Implement monitoring in key components:
   - Login/Authentication flows
   - Payment processing
   - Form submissions
   - Navigation events
3. Set up alerts for:
   - High error rates
   - Slow page loads
   - Failed API calls
   - Abnormal user behavior

## Usage Example
```typescript
// In a React component
const MyComponent = () => {
  const monitoring = useMonitoring('MyComponent');

  const handleClick = () => {
    monitoring.trackInteraction('button_click');
    // ... rest of the handler
  };

  const handleSubmit = async () => {
    try {
      const startTime = performance.now();
      const response = await submitForm();
      monitoring.trackApiCall('submit_form', performance.now() - startTime, response.status);
      monitoring.trackFormSubmission('main_form', true);
    } catch (error) {
      monitoring.trackError('submit', error.message);
      monitoring.trackFormSubmission('main_form', false);
    }
  };

  return (
    // ... component JSX
  );
};
``` 
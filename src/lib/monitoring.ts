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
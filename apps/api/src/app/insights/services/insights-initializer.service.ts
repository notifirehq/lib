import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { UsageInsights } from '../usecases/usage-insights/usage-insights.usecase';
import { UsageInsightsCommand } from '../usecases/usage-insights/usage-insights.command';

@Injectable()
export class InsightsInitializerService implements OnApplicationBootstrap {
  constructor(private usageInsights: UsageInsights) {}

  async onApplicationBootstrap() {
    try {
      Logger.log('Initializing usage insights...');
      const command = new UsageInsightsCommand();

      setTimeout(() => {
        this.usageInsights.execute(command);
      }, 10000);
      Logger.log('Usage insights initialization completed');
    } catch (error) {
      Logger.error('Failed to initialize insights:', error);
    }
  }
}

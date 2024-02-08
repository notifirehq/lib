import {
  AnalyticsService,
  CacheInMemoryProviderService,
  CacheService,
  DistributedLockService,
  FeatureFlagsService,
  MetricsService,
} from '../services';
import { GetFeatureFlag } from '../usecases';
import { Agenda } from '@hokify/agenda';
import { CronService, AgendaCronService } from '../services/cron';

export const featureFlagsService = {
  provide: FeatureFlagsService,
  useFactory: async (): Promise<FeatureFlagsService> => {
    const instance = new FeatureFlagsService();
    await instance.initialize();

    return instance;
  },
};

export const getFeatureFlag = {
  provide: GetFeatureFlag,
  useFactory: async (
    featureFlagsServiceItem: FeatureFlagsService
  ): Promise<GetFeatureFlag> => {
    const useCase = new GetFeatureFlag(featureFlagsServiceItem);

    return useCase;
  },
  inject: [FeatureFlagsService],
};

export const cacheInMemoryProviderService = {
  provide: CacheInMemoryProviderService,
  useFactory: (): CacheInMemoryProviderService => {
    return new CacheInMemoryProviderService();
  },
};

export const cacheService = {
  provide: CacheService,
  useFactory: async (): Promise<CacheService> => {
    const factoryCacheInMemoryProviderService =
      cacheInMemoryProviderService.useFactory();

    const service = new CacheService(factoryCacheInMemoryProviderService);

    await service.initialize();

    return service;
  },
};

export const analyticsService = {
  provide: AnalyticsService,
  useFactory: async () => {
    const service = new AnalyticsService(process.env.SEGMENT_TOKEN);
    await service.initialize();

    return service;
  },
};

export const cronService = {
  provide: CronService,
  useFactory: async (metricsService: MetricsService) => {
    const agenda = new Agenda({ db: { address: process.env.MONGO_URL } });
    const service = new AgendaCronService(agenda, metricsService);

    return service;
  },
  inject: [MetricsService],
};

export const distributedLockService = {
  provide: DistributedLockService,
  useFactory: async (): Promise<DistributedLockService> => {
    const factoryCacheInMemoryProviderService =
      cacheInMemoryProviderService.useFactory();

    const service = new DistributedLockService(
      factoryCacheInMemoryProviderService
    );

    await service.initialize();

    return service;
  },
};

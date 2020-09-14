import { container } from 'tsyringe';
import RedisCacheProvider from './implementations/redis-cache-provider';
import ICacheProvider from './models/icache-provider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);

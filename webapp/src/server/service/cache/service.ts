import { Redis } from 'ioredis';

import { REDIS_CONNECTION_URL } from '@/libs/envValues';
import type CacheServiceInterface from '@/server/service/cache/interface';

const redisClient: Redis = new Redis(REDIS_CONNECTION_URL);

class CacheService implements CacheServiceInterface {
  private client: Redis;

  constructor(redisClient: Redis) {
    this.client = redisClient;
  }

  async getKey(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async checkKey(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  async setKey(key: string, value: string): Promise<boolean> {
    try {
      await this.client.set(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const cacheService = new CacheService(redisClient);

export default cacheService;

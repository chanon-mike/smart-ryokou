import { Redis } from 'ioredis';
import type CacheServiceInterface from './interface';

const redisClient: Redis = new Redis(process.env.REDIS_CONNECTION_URL ?? 'localhost:6379'); // default local

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

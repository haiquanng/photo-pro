import Redis from 'ioredis';

// Redis configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
};

// Create Redis client
const redis = new Redis(redisConfig);

// Handle Redis connection events
redis.on('connect', () => {
  console.log('Redis connected successfully');
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});

redis.on('close', () => {
  console.log('Redis connection closed');
});

// Cache utility functions
export class CacheService {
  private static instance: CacheService;
  private redis: Redis;

  private constructor() {
    this.redis = redis;
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  // Set cache with TTL
  async set(key: string, value: unknown, ttlSeconds: number = 3600): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await this.redis.setex(key, ttlSeconds, serializedValue);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  // Get cache
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  // Delete cache
  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  // Delete multiple keys with pattern
  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache delete pattern error:', error);
    }
  }

  // Check if key exists
  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }

  // Set cache with hash
  async hset(key: string, field: string, value: unknown, ttlSeconds?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await this.redis.hset(key, field, serializedValue);
      if (ttlSeconds) {
        await this.redis.expire(key, ttlSeconds);
      }
    } catch (error) {
      console.error('Cache hset error:', error);
    }
  }

  // Get cache from hash
  async hget<T>(key: string, field: string): Promise<T | null> {
    try {
      const value = await this.redis.hget(key, field);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Cache hget error:', error);
      return null;
    }
  }

  // Get all fields from hash
  async hgetall<T>(key: string): Promise<Record<string, T> | null> {
    try {
      const hash = await this.redis.hgetall(key);
      if (!hash || Object.keys(hash).length === 0) return null;
      
      const result: Record<string, T> = {};
      for (const [field, value] of Object.entries(hash)) {
        result[field] = JSON.parse(value as string) as T;
      }
      return result;
    } catch (error) {
      console.error('Cache hgetall error:', error);
      return null;
    }
  }

  // Delete field from hash
  async hdel(key: string, field: string): Promise<void> {
    try {
      await this.redis.hdel(key, field);
    } catch (error) {
      console.error('Cache hdel error:', error);
    }
  }

  // Increment counter
  async incr(key: string, ttlSeconds?: number): Promise<number> {
    try {
      const result = await this.redis.incr(key);
      if (ttlSeconds && result === 1) {
        await this.redis.expire(key, ttlSeconds);
      }
      return result;
    } catch (error) {
      console.error('Cache incr error:', error);
      return 0;
    }
  }

  // Get TTL
  async ttl(key: string): Promise<number> {
    try {
      return await this.redis.ttl(key);
    } catch (error) {
      console.error('Cache ttl error:', error);
      return -1;
    }
  }

  // Close connection
  async close(): Promise<void> {
    try {
      await this.redis.quit();
    } catch (error) {
      console.error('Cache close error:', error);
    }
  }
}

// Export singleton instance
export const cacheService = CacheService.getInstance();

// Cache key generators
export const cacheKeys = {
  // Projects
  projects: {
    list: (filters: unknown) => `projects:list:${JSON.stringify(filters)}`,
    detail: (id: string) => `projects:detail:${id}`,
    analytics: (filters: unknown) => `projects:analytics:${JSON.stringify(filters)}`,
  },
  
  // Clients
  clients: {
    list: (filters: unknown) => `clients:list:${JSON.stringify(filters)}`,
    detail: (id: string) => `clients:detail:${id}`,
    analytics: (id: string) => `clients:analytics:${id}`,
  },
  
  // Photographers
  photographers: {
    list: (filters: unknown) => `photographers:list:${JSON.stringify(filters)}`,
    detail: (id: string) => `photographers:detail:${id}`,
    schedule: (id: string, date: string) => `photographers:schedule:${id}:${date}`,
  },
  
  // Analytics
  analytics: {
    dashboard: (date: string) => `analytics:dashboard:${date}`,
    revenue: (startDate: string, endDate: string) => `analytics:revenue:${startDate}:${endDate}`,
  },
};

export default cacheService;

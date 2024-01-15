import Redis from 'ioredis'
import { envConfig } from '../config'

export class RedisInstance {
  private static redisMap: Map<number, Redis> = new Map()
  private static n = 0
  public static async initRedis(method: string, db: number = 0) {
    const isExist = this.redisMap.has(db)
    if (!isExist) {
      this.n += 1
      const redis = new Redis({ password: envConfig.REDIS_PASSWD, port: Number(envConfig.REDIS_PORT), host: envConfig.REDIS_HOST, db })
      this.redisMap.set(db, redis)
    }
    return this.redisMap.get(db)
  }
}

export class RedisToken {
  static time: number = 60 * 60 * 24 * 30
  public static async setToken(key: string, value: string) {
    try {
      const redis = await RedisInstance.initRedis('auth.certificate', 0)
      await redis.setex(key, this.time, value)
    }
    catch (error) {
      throw new Error('redis连接失败')
    }
  }

  public static async getToken(key: string): Promise<string | null> {
    try {
      const redis = await RedisInstance.initRedis(
        'TokenGuard.canActivate',
        0,
      )
      const value = await redis.get(key)
      return value
    }
    catch (error) {
      throw new Error('redis连接失败')
    }
  }
}

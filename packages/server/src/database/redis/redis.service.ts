import { envConfig } from '@alice/server/config'
import { Inject, Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@Injectable()
export class RedisService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  private redisMap = new Map<number, Redis>()
  private time = 60 * 60 * 24 * 30
  async initRedis(method: string, db: number = 0) {
    const isExist = this.redisMap.has(db)
    if (!isExist) {
      const redis = new Redis({ password: envConfig.REDIS_PASSWD, port: Number(envConfig.REDIS_PORT), host: envConfig.REDIS_HOST, db })
      this.redisMap.set(db, redis)
    }
    return this.redisMap.get(db)
  }

  async setToken(key: string, value: string) {
    try {
      const redis = await this.initRedis('auth.certificate', 0)
      await redis.setex(key, this.time, value)
    }
    catch (error) {
      this.logger.warn('redis连接失败 setToken失败')
      throw new Error('redis连接失败')
    }
  }

  async getToken(key: string): Promise<string | null> {
    try {
      const redis = await this.initRedis(
        'TokenGuard.canActivate',
        0,
      )
      const value = await redis.get(key)
      return value
    }
    catch (error) {
      this.logger.warn('redis连接失败 getToken失败')
      throw new Error('redis连接失败')
    }
  }
}

import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { isNil } from 'lodash'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { RedisToken } from '../database/redis'
import { IS_PUBLIC_KEY } from '../auth'
import { envConfig } from '../config'
import { User } from '../database/alice/user.entity'

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic)
      return true
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization || void 0
    const token = authorization.split(' ')[1] // authorization: Bearer xxx
    if (!token)
      throw new UnauthorizedException()
    let cache: string | null
    let user: User | null = null
    try {
      user = await this.jwtService.verifyAsync<User>(token, {
        secret: envConfig.JWTSECRET,
      })
      if (isNil(user))
        throw new HttpException('用户失效', HttpStatus.UNAUTHORIZED)
      const key = `user.userId`
      cache = await RedisToken.getToken(key)
      if (typeof cache === 'string')
        cache = cache.split(' ')[1]
    }
    catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (token !== cache) {
      throw new HttpException(
        '您的账号在其他地方登录，请重新登录',
        HttpStatus.UNAUTHORIZED,
      )
    }
    else {
      try {
        await RedisToken.setToken(user.id.toString(), authorization)
      }
      catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
    return true
  }
}

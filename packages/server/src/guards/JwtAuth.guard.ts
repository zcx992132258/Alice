import { ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable, lastValueFrom } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { isNil } from 'lodash'
import { JwtStrategy } from '../modules/auth/jwt.strategy'
import { IS_PUBLIC_KEY } from '../auth'
import { User } from '../database/alice/user.entity'
import { envConfig } from '../config'
import { RedisService } from '../database/redis/redis.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly redisService: RedisService, private reflector: Reflector, private jwtService: JwtService) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    // 如果加了@PUBLIC_KEY注解，直接放行
    if (isPublic)
      return true
    const activate = super.canActivate(context)
    let value: Promise<boolean> | boolean
    if (activate instanceof Observable)
      value = lastValueFrom(activate)
    else
      value = activate
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization || void 0
    const token = authorization.split(' ')[1] // authorization: Bearer xxx
    // 如果token为空，抛出异常
    if (!token)
      throw new UnauthorizedException()

    let cache: string | null
    let user: User | null = null
    try {
      user = await this.jwtService.verifyAsync<User>(token, {
        secret: envConfig.JWTSECRET,
      })
      // 如果user没有值 抛出异常
      if (isNil(user))
        throw new HttpException('用户失效', HttpStatus.UNAUTHORIZED)
      const key = `${user.id}`
      cache = await this.redisService.getToken(key)
      if (token !== cache) {
        throw new HttpException(
          '您的账号在其他地方登录，请重新登录',
          HttpStatus.UNAUTHORIZED,
        )
      }
      await this.redisService.setToken(key, token)
    }
    catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return await value
  }

  handleRequest(err: Error, user) {
    if (err || !user)
      throw err || new HttpException('用户失效', HttpStatus.UNAUTHORIZED)
    return user
  }
}

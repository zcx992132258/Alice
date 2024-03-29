import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { envConfig } from '@alice/server/config'
import { IUser } from '@alice/types/User'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfig.JWTSECRET,
    })
  }

  // JWT验证
  async validate(payload: IUser) {
    return {
      username: payload.username,
      email: payload.email,
      id: payload.id,
    }
  }
}

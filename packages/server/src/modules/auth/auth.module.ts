import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  exports: [AuthService, UserService],
})
export class AuthModule {}

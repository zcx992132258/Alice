import { Module } from '@nestjs/common'
import { RedisModule } from '@alice/server/database/redis/redis.module'
import { AuthService } from '../auth/auth.service'
import { EmailService } from '../email/email.service'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [RedisModule],
  controllers: [UserController],
  providers: [EmailService, UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}

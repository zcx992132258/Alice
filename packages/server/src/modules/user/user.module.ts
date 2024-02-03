import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { User } from '@alice/server/database/alice/user.entity'
import { RedisService } from '@alice/server/database/redis/redis.service'
import { AuthService } from '../auth/auth.service'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, RedisService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}

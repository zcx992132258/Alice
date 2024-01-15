import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { User } from '@alice/server/database/alice/user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

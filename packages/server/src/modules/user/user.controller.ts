import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'

import { Public } from '@alice/server/auth'
import { LocalAuthGuard } from '@alice/server/guards/localAuth.guard'
import { RegisterDto } from '@alice/types'
import { RedisService } from '@alice/server/database/redis/redis.service'
import { AuthService } from '../auth/auth.service'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly redisService: RedisService, private readonly userService: UserService, private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user)
    if (req.user) {
      const data = await this.authService.payloadToken({
        ...req.user,
      })
      await this.redisService.setToken(req.user.id.toString(), data.token)
      return data
    }
    throw new HttpException('登录失败', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @Public()
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.userService.register(user)
  }
}

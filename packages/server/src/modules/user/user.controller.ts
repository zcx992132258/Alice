import { Body, Controller, HttpException, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common'
import { Public } from '@alice/server/auth'
import { LocalAuthGuard } from '@alice/server/guards/localAuth.guard'
import { RegisterDto } from '@alice/types'
import { RedisService } from '@alice/server/database/redis/redis.service'
import { v4 as uuid } from 'uuid'
import { AuthService } from '../auth/auth.service'
import { EmailService } from '../email/email.service'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly redisService: RedisService, private readonly userService: UserService, private readonly authService: AuthService, private readonly emailService: EmailService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    if (req.user) {
      const data = await this.authService.payloadToken({
        ...req.user,
      })
      await this.redisService.set(req.user.id.toString(), data.token)
      return data
    }
    throw new HttpException('登录失败', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @Public()
  @Post('register')
  async register(@Body() user: RegisterDto) {
    const userData = await this.userService.register(user)
    this.redisService.set(uuid(), JSON.stringify(userData), 1)
    this.emailService.sendMail(user.email, 'alice-注册', '请点击链接激活')
  }
}

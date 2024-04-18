import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { Public } from '@alice/server/auth'
import { LocalAuthGuard } from '@alice/server/guards/localAuth.guard'
import { PreRegisterDto, RegisterDto } from '@alice/types'
import { RedisService } from '@alice/server/database/redis/redis.service'
import { v4 as uuid } from 'uuid'
import { envConfig } from '@alice/server/config'
import { REGISTER_EMAIL_EXPIRE, TOKEN_EXPIRE } from '@alice/server/constants'
import { AuthService } from '../auth/auth.service'
import { EmailService } from '../email/email.service'
import { RegisterHtmlContent } from '../email/HtmlContent'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    if (req.user) {
      const data = await this.authService.payloadToken({
        ...req.user,
      })
      await this.redisService.set(req.user.id.toString(), data.token, TOKEN_EXPIRE)
      return data
    }
    throw new HttpException('登录失败', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @Public()
  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    const { email, id } = registerData
    const redisHasUser = await this.redisService.get(email)
    if (redisHasUser) {
      const data = JSON.parse(redisHasUser)
      const { uuid, userData } = data
      if (uuid === id) {
        await this.userService.register(userData)
        await this.redisService.del(email)
        return userData
      }
    }
    throw new HttpException('邮件已过期请重新注册', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @Public()
  @Post('PreRegisterDto')
  async PreRegisterDto(@Body() user: PreRegisterDto) {
    const redisHasUser = await this.redisService.get(user.email)
    if (redisHasUser)
      await this.redisService.del(user.email)
    const userData = await this.userService.PreRegisterDto(user)
    const key = uuid()
    await this.redisService.set(userData.email, JSON.stringify({
      userData,
      uuid: key,
    }), REGISTER_EMAIL_EXPIRE)
    this.emailService.sendMail({
      to: user.email,
      subject: '欢迎加入Alice',
      html: RegisterHtmlContent(`${envConfig.FRONT_URL}/register?email=${userData.email}&id=${key}`),
    })
  }
}

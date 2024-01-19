import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { RedisToken } from '@alice/server/database/redis'
import { Public } from '@alice/server/auth'
import { LocalAuthGuard } from '@alice/server/guards/localAuth.guard'
import { JwtAuthGuard } from '@alice/server/guards/JwtAuth.guard'
import { AuthService } from '../auth/auth.service'
import { RegisterDto } from './dto/register.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    if (req.user) {
      const data = await this.authService.payloadToken({
        ...req.user,
      })
      await RedisToken.setToken(req.user.id.toString(), data.token)
      return data
    }
    else { return 'login fail' }
  }

  @Public()
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.userService.register(user)
  }
}

import { Body, Controller, Inject, Post } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { RedisToken } from '@alice/server/database/redis'
import { Public } from '@alice/server/auth'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService

  @Public()
  @Post('login')
  async login(@Body() user: LoginDto) {
    const foundUser = await this.userService.login(user)
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        ...foundUser,
      })
      await RedisToken.setToken(foundUser.id.toString(), token)
      return token
    }
    else { return 'login fail' }
  }

  @Public()
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.userService.register(user)
  }
}

import { Injectable } from '@nestjs/common'
import { encryptPassword } from '@alice/server/utils/cryptogram'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '@alice/types/User'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username)
    if (user && user.password === encryptPassword(pass, user.passwdSalt)) {
      const payload = {
        username: user.username,
        email: user.email,
        id: user.id,
      }
      return payload
    }
    return null
  }

  async payloadToken(user: IUser) {
    const payload = {
      username: user.username,
      email: user.email,
      id: user.id,
    }
    return {
      token: this.jwtService.sign(payload),
      userInfo: payload,
    }
  }
}

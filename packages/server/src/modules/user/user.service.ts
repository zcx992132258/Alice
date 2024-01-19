import { User } from '@alice/server/database/alice/user.entity'
import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { encryptPassword, makeSalt } from '@alice/server/utils/cryptogram'
import type { RegisterDto } from './dto/register.dto'
import type { LoginDto } from './dto/login.dto'

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  findOne(username: string) {
    return this.userRepository.findOneBy({
      username,
    })
  }

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    })

    if (foundUser)
      throw new HttpException('用户已存在', 200)

    const newUser = new User()
    const salt = makeSalt()
    newUser.username = user.username
    newUser.passwdSalt = salt
    newUser.password = encryptPassword(user.password, salt)
    newUser.email = user.email
    try {
      await this.userRepository.save(newUser)
      return '注册成功'
    }
    catch (e) {
      return '注册失败'
    }
  }

  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    })

    if (!foundUser)
      throw new HttpException('用户名不存在', 200)

    if (foundUser.password !== encryptPassword(user.password, foundUser.passwdSalt))
      throw new HttpException('密码错误', 200)

    return foundUser
  }
}

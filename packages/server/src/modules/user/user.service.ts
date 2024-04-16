import { User } from '@alice/server/database/alice/user.entity'
import { HttpException, Inject, Injectable } from '@nestjs/common'
import { encryptPassword, makeSalt } from '@alice/server/utils/cryptogram'
import { LoginDto, RegisterDto } from '@alice/types/User/dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { AliceClient } from '@alice/aliceDataBase'
import { RedisService } from '@alice/server/database/redis/redis.service'

@Injectable()
export class UserService {
  constructor(@Inject(AliceClient.name) private prismaAlice: CustomPrismaService<typeof AliceClient.client>) {}

  async findOne(username: string) {
    return await this.prismaAlice.client.user.findFirst({
      where: {
        username,
      },
    })
  }

  async register(user: RegisterDto) {
    const foundUser = await this.findOne(user.username)

    if (foundUser)
      throw new HttpException('用户已存在', 200)
    const newUser = new User()
    const salt = makeSalt()
    newUser.username = user.username
    newUser.passwdSalt = salt
    newUser.password = encryptPassword(user.password, salt)
    newUser.email = user.email
    return newUser
  }

  async login(user: LoginDto) {
    const foundUser = await this.findOne(user.username)

    if (!foundUser)
      throw new HttpException('用户名不存在', 200)

    if (foundUser.password !== encryptPassword(user.password, foundUser.passwdSalt))
      throw new HttpException('密码错误', 200)

    return foundUser
  }
}

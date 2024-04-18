import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { encryptPassword, makeSalt } from '@alice/server/utils/cryptogram'
import { LoginDto, PreRegisterDto, RegisterDto } from '@alice/types/User/dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { AliceClient } from '@alice/aliceDataBase'

@Injectable()
export class UserService {
  constructor(@Inject(AliceClient.name) private prismaAlice: CustomPrismaService<typeof AliceClient.client>) {}

  async findOne(username: string) {
    return this.prismaAlice.client.user.findFirst({
      where: {
        username,
      },
    })
  }

  async findUserByEmail(email: string) {
    return this.prismaAlice.client.user.findFirst({
      where: {
        email,
      },
    })
  }

  async register(user: PreRegisterDto) {
    const foundUser = await this.findOne(user.username)
    if (foundUser)
      throw new HttpException('用户已存在', HttpStatus.INTERNAL_SERVER_ERROR)
    // if (await this.findUserByEmail(user.email))
    //   throw new HttpException('邮箱已被注册', 200)
    const salt = makeSalt()
    const password = encryptPassword(user.password, salt)
    await this.prismaAlice.client.user.create({
      data: {
        username: user.username,
        email: user.email,
        password,
        passwdSalt: salt,
      },
    })
  }

  async PreRegisterDto(user: PreRegisterDto) {
    const foundUser = await this.findOne(user.username)
    if (foundUser)
      throw new HttpException('用户已存在', HttpStatus.INTERNAL_SERVER_ERROR)
    // if (await this.findUserByEmail(user.email))
    //   throw new HttpException('邮箱已被注册', 200)
    return user
  }

  async login(user: LoginDto) {
    const foundUser = await this.findOne(user.username)

    if (!foundUser)
      throw new HttpException('用户名不存在', HttpStatus.INTERNAL_SERVER_ERROR)

    if (foundUser.password !== encryptPassword(user.password, foundUser.passwdSalt))
      throw new HttpException('密码错误', HttpStatus.INTERNAL_SERVER_ERROR)

    return foundUser
  }
}

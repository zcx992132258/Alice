import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'

export class LoginDto {
  @IsString({ message: '请输入用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  username!: string

  @IsString({ message: '请输入密码' })
  @IsNotEmpty({ message: '请输入密码' })
  password!: string
}

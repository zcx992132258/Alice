import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'

export class RegisterDto {
  @IsString({ message: '请输入用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  username: string

  @IsString({ message: '请输入密码' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string

  @IsNotEmpty({ message: '请输入邮箱地址' })
  @IsEmail({}, { message: '邮箱格式错误' })
  email: string
}

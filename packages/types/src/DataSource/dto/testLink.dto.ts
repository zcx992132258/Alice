import { IsNumber, IsString, Matches } from 'class-validator'
import { hostRegex, portRegex } from '@alice/tools/src/regex'

export class TestLinkDto {
  @IsString()
  @Matches(hostRegex, {
    message: '请输入正确主机地址',
  })
  host!: string

  @IsString()
  @Matches(portRegex, {
    message: '请输入正确主机地址',
  })
  port!: string

  @IsString({ message: '请输入数据库名称' })
  database!: string

  @IsString({ message: '请输入用户名称' })
  username!: string

  @IsString({ message: '请输入用户密码' })
  password!: string
}

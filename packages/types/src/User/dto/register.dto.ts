import { IsEmail, IsString } from 'class-validator'

export class RegisterDto {
  @IsString({ message: '注册失败请重试' })
  @IsEmail({}, { message: '注册失败请重试' })
  email!: string

  @IsString({ message: '注册失败请重试' })
  id!: string
}

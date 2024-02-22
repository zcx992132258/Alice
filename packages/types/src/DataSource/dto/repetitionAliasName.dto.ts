import { IsNumber, IsOptional, IsString, isNumber } from 'class-validator'

export class RepetitionAliasNameDto {
  @IsString({
    message: '请输入名称',
  })
  name!: string

  @IsNumber()
  @IsOptional() // 这个装饰器表示该属性是可选的
  id?: number
}

import { IsString } from 'class-validator'

export class RepetitionAliasNameDto {
  @IsString({
    message: '请输入名称',
  })
  name!: string
}

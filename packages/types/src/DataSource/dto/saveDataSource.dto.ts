import { IsString, Length } from 'class-validator'
import { TestLinkDto } from './testLink.dto'

export class SaveDataSourceDto extends TestLinkDto {
  @IsString()
  tableName!: string

  @IsString()
  @Length(2, 10)
  aliasName!: string
}

import { IsNumber, IsString, Length } from 'class-validator'
import { TestLinkDto } from './testLink.dto'

export class EditDataSourceDto extends TestLinkDto {
  @IsNumber()
  id!: number

  @IsString()
  tableName!: string

  @IsString()
  @Length(2, 10)
  aliasName!: string
}

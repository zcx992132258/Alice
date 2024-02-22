import { IsString } from 'class-validator'

export class PreviewDataSourceDto {
  @IsString()
  id!: string
}

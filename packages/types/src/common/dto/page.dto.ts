import { IsNumber, IsString } from 'class-validator'

export class PageDto {
  @IsNumber()
  page!: number

  @IsNumber()
  size!: number
}

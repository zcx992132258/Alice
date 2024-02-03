import { PageDto } from '@alice/types/common/dto/page.dto'
import { IsString } from 'class-validator'

export class SourceListDto extends PageDto {
  @IsString()
  search?: string
}

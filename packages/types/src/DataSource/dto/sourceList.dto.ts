import { IsOptional, IsString } from 'class-validator'
import { PageDto } from '../../common/dto'

export class SourceListDto extends PageDto {
  @IsString()
  @IsOptional() // 这个装饰器表示该属性是可选的
  search?: string | null
}

import { TestLinkDto } from '@alice/types'
import { Body, Controller, Post } from '@nestjs/common'
import { DataSourceService } from './dataSource.service'

@Controller('dataSource')
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @Post('testLink')
  async testLink(@Body() config: TestLinkDto) {
    await this.dataSourceService.testLink(config)
    return '链接成功'
  }
}

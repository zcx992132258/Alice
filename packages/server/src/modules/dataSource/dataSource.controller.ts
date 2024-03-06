import { EditDataSourceDto, IUser, PreviewDataSourceDto, RepetitionAliasNameDto, SaveDataSourceDto, SourceListDto, TestLinkDto } from '@alice/types'
import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Query, Request } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { DataSourceService } from './dataSource.service'

@Controller('dataSource')
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  @Post('testLink')
  async testLink(@Body() config: TestLinkDto) {
    const connection = await this.dataSourceService.testLink(config)
    connection.destroy()
    return '链接成功'
  }

  @Post('getTables')
  async getTables(@Body() config: TestLinkDto) {
    return await this.dataSourceService.showTable(config)
  }

  @Post('saveDataSource')
  async saveDataSource(@Body() config: SaveDataSourceDto, @Request() req) {
    const user = req.user as IUser
    if (user)
      await this.dataSourceService.saveDataSource(config, user)
    else
      throw new HttpException('操作失败', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @Post('editDataSource')
  async editDataSource(@Body() config: EditDataSourceDto, @Request() req) {
    const user = req.user as IUser
    if (user)
      await this.dataSourceService.editDataSource(config, user)
    else
      throw new HttpException('操作失败', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @Get('previewDataSource')
  async previewDataSource(@Query() params: PreviewDataSourceDto) {
    return this.dataSourceService.previewDataSource(Number(params.id))
  }

  @Get('repetitionAliasName')
  async repetitionAliasName(@Param()params: RepetitionAliasNameDto) {
    const data = await this.dataSourceService.repetitionAliasName(params.name, params.id)
    return !!data
  }

  @Post('sourceList')
  async getSourceList(@Body()params: SourceListDto, @Request() req) {
    const user = req.user as IUser
    if (user)
      return await this.dataSourceService.getUserDataSource(user, params)
    else
      throw new HttpException('操作失败', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

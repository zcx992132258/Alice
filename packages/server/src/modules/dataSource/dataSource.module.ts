import { Module } from '@nestjs/common'
import { DataSourceController } from './dataSource.controller'
import { DataSourceService } from './dataSource.service'

@Module({
  providers: [DataSourceService],
  controllers: [DataSourceController],
})
export class DataSourceModule {}

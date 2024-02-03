import { Module } from '@nestjs/common'
import { User } from '@alice/server/database/alice/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from '@alice/server/database/alice/dataSource.entity'
import { UserService } from '../user/user.service'
import { DataSourceController } from './dataSource.controller'
import { DataSourceService } from './dataSource.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, DataSource])],
  providers: [DataSourceService, UserService],
  controllers: [DataSourceController],
})
export class DataSourceModule {}

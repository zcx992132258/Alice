import { TestLinkDto } from '@alice/types/DataSource'
import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class DataSourceService {
  async testLink(config: TestLinkDto) {
    const AppDataSource = new DataSource({
      type: 'mysql',
      ...config,
      port: Number(config.port),
      connectorPackage: 'mysql2',
    })
    await AppDataSource.initialize().catch((err) => { console.error('Error during Data Source initialization', err) })
  }
}

import { User } from '@alice/server/database/alice/user.entity'
import { EditDataSourceDto, SaveDataSourceDto, SourceListDto, TestLinkDto } from '@alice/types/DataSource'
import { IUser } from '@alice/types/User'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Like, Repository } from 'typeorm'
import { DataSource as DataSourceEntity } from '@alice/server/database/alice/dataSource.entity'
import { findLimit } from '@alice/server/utils/findLimit'
import { CustomPrismaService } from 'nestjs-prisma'
import { AliceClient } from '@alice/aliceDataBase'

@Injectable()
export class DataSourceService {
  constructor(@Inject(AliceClient.name) private prismaAlice: CustomPrismaService<typeof AliceClient.client>) {}

  @InjectRepository(DataSourceEntity)
  private dataSourceRepository: Repository<DataSourceEntity>

  async testLink(config: TestLinkDto) {
    const AppDataSource = new DataSource({
      type: 'mysql',
      ...config,
      port: Number(config.port),
      connectorPackage: 'mysql2',
    })
    return await AppDataSource.initialize()
  }

  async showTable(config: TestLinkDto) {
    const connection = await this.testLink(config)
    const tables = await connection.query<{ [key: string]: string }[]>(`SHOW TABLES`)
    connection.destroy()
    return tables.map(v => Object.values(v)).flat()
  }

  async repetitionAliasName(name: string, id?: number) {
    const data = await this.prismaAlice.client.data_source.findFirst({
      where: {
        aliasName: name,
      },
    })
    return data?.id === id
  }

  async saveDataSource(config: SaveDataSourceDto, user: IUser, id?: number) {
    const hasName = await this.repetitionAliasName(config.aliasName, id)
    if (hasName)
      throw new HttpException('名称已存在', HttpStatus.INTERNAL_SERVER_ERROR)
    const userInfo = await this.prismaAlice.client.user.findFirst({
      where: {
        id: user.id,
      },
    })
    const data = {
      ...config,
      user: {
        connect: {
          id: userInfo.id,
        },
      },
    }
    await this.prismaAlice.client.data_source.upsert({
      where: {
        id,
      },
      update: data,
      create: data,

    })
  }

  async editDataSource(params: EditDataSourceDto, user: IUser) {
    const data = await this.prismaAlice.client.user.findFirst({
      where: {
        id: params.id,
      },
    })
    if (data)
      await this.saveDataSource(params, user, data.id)
  }

  async previewDataSource(id: number) {
    const data = await this.prismaAlice.client.data_source.findFirst({
      where: {
        id,
      },
    })
    if (data) {
      const contentClient = await this.testLink(data)
      const colum = (await contentClient.query(`DESCRIBE ${data.tableName}`)).map(v => ({ field: v.Field, type: v.Type }))
      const tableData = await contentClient.query(`SELECT * FROM ${data.tableName} LIMIT 30`)
      contentClient.destroy()
      return {
        colum,
        tableData,
      }
    }
  }

  async getUserDataSource(user: IUser, params: SourceListDto) {
    await this.previewDataSource(10)
    return await findLimit({
      page: params.page,
      size: params.size,
    }, this.dataSourceRepository, {
      where: [{
        createdUser: user,
        aliasName: Like(`%${params.search}%`),
      }],
    })
  }
}

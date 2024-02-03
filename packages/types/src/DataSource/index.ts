import { IList } from '../common'

export * from './dto'

export interface IDataSource {
  id: number

  database: string

  host: string

  port: string

  username: string

  aliasName: string

  password: string

  tableName: string

  createTime: Date

  updateTime: Date

  createdUserId: string

}

export type IDataSourceList = IList<IDataSource>

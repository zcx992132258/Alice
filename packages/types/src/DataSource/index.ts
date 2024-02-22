import { IList } from '../common'

export * from './dto'

export interface IDataSource {
  id: number

  database: string

  host: string

  port: number

  username: string

  aliasName: string

  password: string

  tableName: string

  createTime: Date

  updateTime: Date

  createdUserId: string

}

export interface IPreviewDataSource {
  colum: { field: string, type: string }[]
  tableData: any[]
}

export type IDataSourceList = IList<IDataSource>

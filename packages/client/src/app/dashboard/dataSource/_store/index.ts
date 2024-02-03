import { apiSaveDataSource } from '@alice/client/api/dataSource'
import { IDataSource, SaveDataSourceDto } from '@alice/types/DataSource'
import { create } from 'zustand'

export interface IDataSourceStore {
  page: number
  size: number
  search: string
  dataSourceList: IDataSource[]
  total: number
  loading: boolean
  addDataSource: (config: SaveDataSourceDto) => Promise<void>
  getDataSourceList: () => Promise<void>
}

export const useDataSourceStore = create<IDataSourceStore>((set) => {
  return {
    page: 1,
    size: 10,
    search: '',
    dataSourceList: [],
    total: 0,
    loading: false,
    dataSource: null,
    async addDataSource(config) {
      // await apiSaveDataSource(config)
      set({ page: 1 })
    },
    async getDataSourceList() {
      set({ page: 2 })
    },
  }
})

'use client'
import { apiGetDataSourceList, apiSaveDataSource } from '@alice/client/api/dataSource'
import { IDataSource, SaveDataSourceDto } from '@alice/types/DataSource'
import { create } from 'zustand'

export interface IDataSourceStore {
  page: number
  size: number
  search: string
  dataSourceList: IDataSource[]
  total: number
  loading: boolean
  setPageSize: (page: number, size: number) => void
  addDataSource: (config: SaveDataSourceDto) => Promise<void>
  getDataSourceList: () => Promise<void>
  searchDataSourceList: (val: string) => Promise<void>
}

export const useDataSourceStore = create<IDataSourceStore>((set, get) => {
  return {
    page: 1,
    size: 10,
    search: '',
    dataSourceList: [],
    total: 0,
    loading: false,
    dataSource: null,
    setPageSize: (page: number, size: number) => {
      set({ page, size })
    },
    async addDataSource(config) {
      await apiSaveDataSource(config)
      set({ page: 1 })
    },
    async searchDataSourceList(val: string) {
      set({
        search: val,
        page: 1,
      })
      await get().getDataSourceList()
    },
    async getDataSourceList() {
      set({ loading: true })
      const state = get()
      try {
        const { total, page, list } = await apiGetDataSourceList({ page: state.page, size: state.size })
        set({
          dataSourceList: list,
          total,
          page,
        })
      }
      catch (error) {
        console.error(error)
      }
      finally {
        set({ loading: false })
      }
    },
  }
})

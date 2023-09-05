import type { EChartsOption } from 'echarts'

export interface IMenuData {
  name: string
  chartOptions: EChartsOption
  type: string
  height: number
  width: number
}

export interface IMenu {
  label: string
  data: IMenuData[]
}

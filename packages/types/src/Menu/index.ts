import type { EChartsOption } from 'echarts'
import type { Component } from '../Component'

export interface IMenuData {
  name: string
  chartOptions: EChartsOption
  type: string
  height: number
  width: number
  setting: {
    styleSetting: {
      border: Component['setting']['styleSetting']['border']
      baseStyle: Component['setting']['styleSetting']['baseStyle']
    }
  }
}

export interface IMenu {
  label: string
  iconType: string
  activeIconTYpe: string
  data: IMenuData[]
}

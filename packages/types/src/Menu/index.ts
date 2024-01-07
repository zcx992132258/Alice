import type { EChartsOption } from 'echarts'
import type { Component } from '../Component'

export interface IMenuData {
  name: string
  chartOptions: EChartsOption
  type: string
  height: number
  width: number
  setting: {
    styleSetting: Component['setting']['styleSetting']
    graphSetting?: Component['setting']['graphSetting']
  }
}

export interface IMenu {
  label: string
  iconType: string
  activeIconTYpe: string
  data: IMenuData[]
}

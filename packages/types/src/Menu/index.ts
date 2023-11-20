import type { EChartsOption } from 'echarts'

export interface IMenuData {
  name: string
  chartOptions: EChartsOption
  type: string
  height: number
  width: number
  setting: {
    styleSetting: {
      border: {
        componentName: null | string
        color: string[]
        backgroundColor: string
        reverse: true | boolean
        title: string
        titleWidth: number
        settingComponentName: string
      }
    }
  }

}

export interface IMenu {
  label: string
  iconType: string
  activeIconTYpe: string
  data: IMenuData[]
}

import type { EChartsOption } from 'echarts'
import type { Layout } from 'react-grid-layout'

export interface Component {
  type: string
  chartOptions: EChartsOption
  name: string
  id: string
  layout: Layout
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

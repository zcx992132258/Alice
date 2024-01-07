import type { EChartsOption, RegisteredSeriesOption } from 'echarts'
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
      baseStyle: {
        padding: number
        useBackgroundColor: boolean
        backgroundColor: null | string
        backgroundImage: null | string
        backgroundImageName: null | string
        settingComponentName: string
        useBackgroundImage: boolean
        borderRadius: number
      }
    }
    graphSetting: {
      lineSetting?: {
        lineWidth: number
        symbol: string
        symbolSize: number
        smooth: boolean
        labelFontSize: number
        labelFontWeight: string
        labelBorderWidth: number
        labelBorderColor: string | null
        padding: number
      }
    }
  }
}

import type { EChartsOption } from 'echarts'
import type { Layout } from 'react-grid-layout'

export interface Component {
  type: string
  chartOptions: EChartsOption
  name: string
  id: string
  layout: Layout
}

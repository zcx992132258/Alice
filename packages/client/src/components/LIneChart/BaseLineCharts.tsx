import type { Component } from '@lowCode/types'
import { useEchartsCreate } from '@/hooks/useEchartsCreate'

export function BaseLineCharts(props: Component) {
  const { wrap, chart } = useEchartsCreate(props.chartOptions)

  return <div ref={wrap} className='h-[100%] w-[100%]' />
}

export default BaseLineCharts

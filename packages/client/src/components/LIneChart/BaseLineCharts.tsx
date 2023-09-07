import type { Component } from '@lowCode/types'
import { useEchartsCreate } from '@/hooks/useEchartsCreate'

export function BaseLineCharts(props: Component) {
  const { wrap } = useEchartsCreate(props.chartOptions)
  return (
    <div className='h-[100%] w-[100%]'>
      <div ref={wrap} className='h-[100%] w-[100%]' />
    </div>

  )
}

export default BaseLineCharts

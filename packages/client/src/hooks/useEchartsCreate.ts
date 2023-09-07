'use client'
import { useEffect, useRef } from 'react'
import { init } from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

import { useMount, useSize } from 'ahooks'

export function useEchartsCreate(options: EChartsOption) {
  const wrap = useRef<HTMLDivElement | null>(null)
  const chart = useRef<ECharts>()
  const size = useSize(wrap)
  const el = useRef()
  useMount(() => {
    const el = wrap.current
    if (el) {
      chart.current = init(el)
      chart.current.setOption(options)
    }
  })

  useEffect(() => {
    chart.current?.resize()
  }, [size])

  return {
    wrap, chart, el,
  }
}

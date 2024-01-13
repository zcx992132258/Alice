'use client'
import { useEffect, useRef } from 'react'
import { init } from 'echarts'
import type { ECharts, EChartsOption, RegisteredSeriesOption } from 'echarts'

import { useSize } from 'ahooks'
import type { Component } from '@alice/types'

export function transFromLineSetting(setting: NonNullable<Component['setting']['graphSetting']['lineSetting']>, options: EChartsOption): EChartsOption {
  const { lineWidth, symbol, symbolSize, smooth, tagLabelSetting, tooltipSetting } = setting
  return {
    ...options,
    tooltip: {
      show: tooltipSetting.show,
      borderColor: tooltipSetting.borderColor,
      borderWidth: tooltipSetting.borderWidth,
      textStyle: {
        fontSize: tooltipSetting.fontSize,
        color: tooltipSetting.fontColor,
      },
      backgroundColor: tooltipSetting.backGroundColor,
    },
    series: (options.series as RegisteredSeriesOption['line'][]).map((v) => {
      return {
        ...v,
        data: v.data,
        lineStyle: {
          width: lineWidth,
        },
        symbol,
        symbolSize,
        smooth,
        label: {
          show: tagLabelSetting?.show,
          fontSize: tagLabelSetting?.fontSize,
          color: tagLabelSetting?.fontColor,
        },
      }
    }),
  }
}

export function useEchartsCreate(options: EChartsOption) {
  const wrap = useRef<HTMLDivElement | null>(null)
  const chart = useRef<ECharts>()
  const size = useSize(wrap)

  useEffect(() => {
    chart.current?.resize()
  }, [size])

  useEffect(() => {
    if (chart.current) {
      chart.current.setOption(options)
    }
    else {
      const el = wrap.current
      if (el) {
        chart.current = init(el)
        chart.current.setOption(options)
      }
    }
  }, [options])

  return {
    wrap,
    chart,
  }
}

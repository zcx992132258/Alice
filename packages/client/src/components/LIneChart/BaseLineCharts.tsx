import type { Component } from '@alice/types'
import { useCreation } from 'ahooks'
import { transFromLineSetting, useEchartsCreate } from '@alice/client/hooks/useEchartsCreate'

export function BaseLineCharts(props: Component) {
  const options = useCreation(() => {
    const setting = props.setting.graphSetting.lineSetting!
    return transFromLineSetting(setting, props.chartOptions)
  }, [props.setting.graphSetting])

  const { wrap } = useEchartsCreate(options)

  return (
    <div className="h-[100%] w-[100%]">
      <div ref={wrap} className="h-[100%] w-[100%]" />
    </div>

  )
}

export default BaseLineCharts

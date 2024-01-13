import { useCreation } from 'ahooks'
import { cloneDeep } from 'lodash-es'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { usePageContext } from '@alice/client/app/_components'
import type { SliderSingleProps } from '@alice/client/lib/Antd'
import { Checkbox, Col, Row, Select, Slider } from '@alice/client/lib/Antd'

const symbolOptions = [
  { value: 'circle', label: '圆形' },
  { value: 'rect', label: '正方形' },
  { value: 'triangle', label: '三角形' },
  { value: 'diamond', label: '菱形' },
]

export function LineSizeSetting() {
  const { curComponent, setCurComponent, handleSetComponent } = usePageContext()

  const lineSetting = curComponent!.setting.graphSetting.lineSetting!

  const handleLineWidthChange: SliderSingleProps['onChange'] = (value) => {
    curComponent!.setting.graphSetting.lineSetting = {
      ...lineSetting,
      lineWidth: value,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }
  const handleSymbolSizeChange: SliderSingleProps['onChange'] = (symbolSize) => {
    curComponent!.setting.graphSetting.lineSetting = {
      ...lineSetting,
      symbolSize,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  const handleSymbolChange = (symbol: string) => {
    curComponent!.setting.graphSetting.lineSetting = {
      ...lineSetting,
      symbol,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }
  const handleSmoothChange = (event: CheckboxChangeEvent) => {
    curComponent!.setting.graphSetting.lineSetting = {
      ...lineSetting,
      smooth: event.target.checked,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  return (
    <div className="w-[100%]">
      <Row className="mb-[16px] flex items-center">
        <Col span={6}>线宽:</Col>
        <Col span={18}>
          <Slider value={lineSetting?.lineWidth} max={10} onChange={handleLineWidthChange}></Slider>
        </Col>
      </Row>
      <Row className="mb-[16px] flex items-center">
        <Col span={6}>折点:</Col>
        <Col span={18}>
          <Select
            defaultValue={lineSetting.symbol}
            className="w-[60%]"
            options={symbolOptions}
            onChange={handleSymbolChange}
          />
        </Col>
      </Row>
      <Row className="mb-[16px] flex items-center">
        <Col span={6}>折点大小:</Col>
        <Col span={18}>
          <Slider value={lineSetting?.symbolSize} max={20} onChange={handleSymbolSizeChange}></Slider>
        </Col>
      </Row>
      <Row className="mb-[16px] flex items-center">
        <Col span={6}>平滑折线:</Col>
        <Col span={18}>
          <Checkbox
            defaultChecked={lineSetting.smooth}
            onChange={handleSmoothChange}
          />
        </Col>
      </Row>
    </div>
  )
}

export default LineSizeSetting

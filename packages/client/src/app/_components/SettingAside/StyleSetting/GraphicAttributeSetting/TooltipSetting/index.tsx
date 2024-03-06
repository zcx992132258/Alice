import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import cloneDeep from 'lodash-es/cloneDeep'
import { usePageContext } from '@alice/client/app/_components'
import { CreateFontSizeOptions } from '@alice/client/util/CreateFontSizeOptions'
import type { ColorPickerProps } from 'antd'
import { Col, ColorPicker, Row, Select, Slider } from 'antd'
import Checkbox from 'antd/es/checkbox'

const fontSizeOptions = CreateFontSizeOptions()

export function TooltipSetting() {
  const { curComponent, setCurComponent, handleSetComponent } = usePageContext()
  const tooltipSetting = curComponent!.setting.graphSetting.lineSetting!.tooltipSetting!

  const handleShowChange = (event: CheckboxChangeEvent) => {
    curComponent!.setting.graphSetting.lineSetting!.tooltipSetting = {
      ...tooltipSetting,
      show: event.target.checked,
      backGroundColor: 'rgba(50,50,50,0.7)',
      fontColor: '#fff',
      fontSize: 14,
      borderColor: '#333',
      borderWidth: 0,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  const handleFontSizeChange = (fontSize: number) => {
    curComponent!.setting.graphSetting.lineSetting!.tooltipSetting = {
      ...tooltipSetting,
      fontSize,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  const handleFontColorChange: ColorPickerProps['onChangeComplete'] = (value) => {
    const fontColor = value.toHexString()
    curComponent!.setting.graphSetting.lineSetting!.tooltipSetting = {
      ...tooltipSetting,
      fontColor,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  const handleBackGroundColorChange: ColorPickerProps['onChangeComplete'] = (value) => {
    const backGroundColor = value.toHexString()
    curComponent!.setting.graphSetting.lineSetting!.tooltipSetting = {
      ...tooltipSetting,
      backGroundColor,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  const handleBorderWidthChange = (borderWidth: number) => {
    curComponent!.setting.graphSetting.lineSetting!.tooltipSetting = {
      ...tooltipSetting,
      borderWidth,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  const handleBorderColorChange: ColorPickerProps['onChangeComplete'] = (value) => {
    const borderColor = value.toHexString()
    curComponent!.setting.graphSetting.lineSetting!.tooltipSetting = {
      ...tooltipSetting,
      borderColor,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  return (
    <div className="w-[100%]">
      <Row className="mb-[16px] flex items-center">
        <Col span={6}>显示:</Col>
        <Col span={18}>
          <Checkbox
            defaultChecked={tooltipSetting.show}
            onChange={handleShowChange}
          />
        </Col>
      </Row>
      {
        tooltipSetting.show
          ? (
            <>
              <Row className="mb-[16px] flex items-center">
                <Col span={6}>字体大小:</Col>
                <Col span={18}>
                  <Select
                    defaultValue={tooltipSetting.fontSize}
                    className="w-[60%]"
                    options={fontSizeOptions}
                    onChange={handleFontSizeChange}
                  />
                </Col>
              </Row>
              <Row className="mb-[16px] flex items-center">
                <Col span={6}>字体颜色:</Col>
                <Col span={18}>
                  <ColorPicker
                    value={tooltipSetting?.fontColor}
                    onChangeComplete={handleFontColorChange}
                  />
                </Col>
              </Row>
              <Row className="mb-[16px] flex items-center">
                <Col span={6}>背景颜色:</Col>
                <Col span={18}>
                  <ColorPicker
                    value={tooltipSetting?.backGroundColor}
                    onChangeComplete={handleBackGroundColorChange}
                  />
                </Col>
              </Row>
              <Row className="mb-[16px] flex items-center">
                <Col span={6}>边框宽度:</Col>
                <Col span={18}>
                  <Slider value={tooltipSetting?.borderWidth} max={10} onChange={handleBorderWidthChange}></Slider>
                </Col>
              </Row>
              <Row className="mb-[16px] flex items-center">
                <Col span={6}>边框颜色:</Col>
                <Col span={18}>
                  <ColorPicker
                    value={tooltipSetting?.borderColor}
                    onChangeComplete={handleBorderColorChange}
                  />
                </Col>
              </Row>
            </>
            )
          : <></>
      }
    </div>
  )
}

export default TooltipSetting

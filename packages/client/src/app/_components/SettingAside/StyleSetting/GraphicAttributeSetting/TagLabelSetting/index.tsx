import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { cloneDeep } from 'lodash-es'
import { usePageContext } from '@alice/client/app/_components'
import { CreateFontSizeOptions } from '@alice/client/util/CreateFontSizeOptions'
import type { ColorPickerProps } from 'antd'
import { Col, ColorPicker, Row, Select } from 'antd'
import Checkbox from 'antd/es/checkbox'

const fontSizeOptions = CreateFontSizeOptions()

export function TagLabelSetting() {
  const { curComponent, setCurComponent, handleSetComponent } = usePageContext()
  const tagLabelSetting = curComponent!.setting.graphSetting.lineSetting!.tagLabelSetting!

  const handleShowChange = (event: CheckboxChangeEvent) => {
    curComponent!.setting.graphSetting.lineSetting!.tagLabelSetting = {
      ...tagLabelSetting,
      show: event.target.checked,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  const handleFontSizeChange = (fontSize: number) => {
    curComponent!.setting.graphSetting.lineSetting!.tagLabelSetting = {
      ...tagLabelSetting,
      fontSize,
    }
    setCurComponent(cloneDeep(curComponent))
    handleSetComponent([cloneDeep(curComponent!)])
  }

  const handleFontColorChange: ColorPickerProps['onChangeComplete'] = (value) => {
    const fontColor = value.toHexString()
    curComponent!.setting.graphSetting.lineSetting!.tagLabelSetting = {
      ...tagLabelSetting,
      fontColor,
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
            defaultChecked={tagLabelSetting.show}
            onChange={handleShowChange}
          />
        </Col>
      </Row>
      {
        tagLabelSetting.show
          ? (
            <>
              <Row className="mb-[16px] flex items-center">
                <Col span={6}>字体大小:</Col>
                <Col span={18}>
                  <Select
                    defaultValue={tagLabelSetting.fontSize}
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
                    value={tagLabelSetting?.fontColor}
                    onChangeComplete={handleFontColorChange}
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
export default TagLabelSetting

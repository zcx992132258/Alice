import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { cloneDeep } from 'lodash-es'
import { usePageContext } from '@/app/_components'
import type { ColorPickerProps } from '@/lib/Antd'
import { Checkbox, Col, ColorPicker, Row, Select } from '@/lib/Antd'

let num = 9
const fontSizeOptions = Array.from({ length: 31 }).map(() => {
  const value = num += 1
  return { value, label: value }
})

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

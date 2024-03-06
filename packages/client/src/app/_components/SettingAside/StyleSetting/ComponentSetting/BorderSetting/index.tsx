'use client'
import { cloneDeep } from 'lodash-es'
import type { Component } from '@alice/types'
import { Suspense } from 'react'
import { usePageContext } from '@alice/client/app/_components'
import * as BorderComponents from '@alice/client/lib/DataV'
import { Col, ColorPicker, Row, Skeleton } from 'antd'
import { useCreation } from 'ahooks'
import StyleSettingCss from '../../style/index.module.scss'

const components = Object.entries(BorderComponents).map((v) => {
  const [key, Component] = v
  return {
    key,
    Component,
  }
})

export function BorderSetting() {
  const { curComponent, setCurComponent, handleSetComponent } = usePageContext()

  const styleSetting = useCreation(() => {
    return curComponent!.setting.styleSetting
  }, [curComponent])

  const setComponentBorder = (data: Partial<Component['setting']['styleSetting']['border']>) => {
    if (curComponent) {
      curComponent.setting.styleSetting.border = {
        ...curComponent.setting.styleSetting.border,
        ...data,
      }
      setCurComponent(cloneDeep(curComponent))
      handleSetComponent([cloneDeep(curComponent)])
    }
  }

  const handleColorChange = (color: string[]) => {
    setComponentBorder({
      color,
    })
  }

  const handleSetBorderComponent = (componentName: string) => {
    const name = componentName === styleSetting.border.componentName ? null : componentName
    setComponentBorder({
      componentName: name,
    })
  }

  return (
    <div className={StyleSettingCss['border-setting']}>
      <Row className="flex items-center mb-[16px]">
        <Col span={6}>边框主颜色：</Col>
        <Col span={18}>
          <ColorPicker
            value={styleSetting.border.color[0].toString()}
            onChangeComplete={(color) => {
              handleColorChange([color.toHexString(), styleSetting.border.color[1]])
            }}
          />
        </Col>
      </Row>
      <Row className="flex items-center mb-[8px]">
        <Col span={6}>边框副颜色：</Col>
        <Col span={18}>
          <ColorPicker value={styleSetting.border.color[1].toString()} onChangeComplete={color => handleColorChange([styleSetting.border.color[0], color.toHexString()])} />
        </Col>
      </Row>
      <div>
        {
          components.map((v) => {
            const { Component } = v
            return (
              <Suspense key={v.key} fallback={<Skeleton.Button style={{ height: `150px`, width: '100%' }} block active className="mb-[20px]" />}>
                <div
                  className={`h-[250px] p-[20px] mb-[20px] hover:bg-[#e6f4ff] rounded-[8px] cursor-pointer ${v.key === styleSetting.border.componentName ? StyleSettingCss.active : ''}`}
                  onClick={() => handleSetBorderComponent(v.key)}
                >
                  <Component
                    backgroundColor={styleSetting.border.backgroundColor}
                    color={[styleSetting.border.color[0], styleSetting.border.color[1]]}
                    title={styleSetting.border.title}
                    titleWidth={styleSetting.border.titleWidth}
                  >
                  </Component>

                </div>
              </Suspense>
            )
          })
        }
      </div>
    </div>
  )
}

export default BorderSetting

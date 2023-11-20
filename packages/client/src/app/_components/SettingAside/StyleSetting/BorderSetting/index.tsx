'use client'
import { cloneDeep } from 'lodash-es'
import type { Component } from '@lowCode/types'
import StyleSettingCss from '../style/index.module.scss'
import { usePageContext } from '@/app/_components'
import { ColorPicker } from '@/lib/Antd'
import { useCreation } from '@/lib/ahook'
import * as BorderComponents from '@/lib/DataV'

const components = Object.entries(BorderComponents).map((v) => {
  const [key, Component] = v
  return {
    key,
    Component,
  }
})

export function BorderSetting() {
  const { curComponent, setCurComponent, handleSetComponent } = usePageContext()

  const border = useCreation<Component['setting']['styleSetting']['border']>(() => {
    return curComponent!.setting.styleSetting.border
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
    const name = componentName === border.componentName ? null : componentName
    setComponentBorder({
      componentName: name,
    })
  }

  return (
    <div className={StyleSettingCss['border-setting']}>
      <div className="flex items-center mb-[16px]">
        边框主颜色：
        <ColorPicker
          value={border.color[0].toString()}
          onChangeComplete={(color) => {
            handleColorChange([color.toHexString(), border.color[1]])
          }}
        />
      </div>
      <div className="flex items-center mb-[8px]">
        边框副颜色：
        <ColorPicker value={border.color[1].toString()} onChangeComplete={color => handleColorChange([border.color[0], color.toHexString()])} />
      </div>
      <div>
        {
          components.map((v) => {
            const { Component } = v
            return (
              <div
                className={`h-[150px] p-[20px] mb-[20px] hover:bg-[#e6f4ff] rounded-[8px] cursor-pointer ${v.key === border.componentName ? StyleSettingCss.active : ''}`}
                key={v.key}
                onClick={() => handleSetBorderComponent(v.key)}
              >
                <Component
                  backgroundColor={border.backgroundColor}
                  color={[border.color[0], border.color[1]]}
                  title={border.title}
                  titleWidth={border.titleWidth}
                >
                </Component>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default BorderSetting

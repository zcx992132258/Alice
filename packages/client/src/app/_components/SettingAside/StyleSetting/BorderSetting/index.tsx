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
  const { curComponent } = usePageContext()

  const color = useCreation(() => {
    const value = curComponent?.setting.styleSetting.border.color
    if (value)
      return value

    return '#1677FF'
  }, [curComponent])
  return (
    <div>
      <ColorPicker value={color} />
      <div>
        {
          components.map((v) => {
            const { Component } = v
            return <Component style={{ height: '200px' }}></Component>
          })
        }
      </div>
    </div>
  )
}

export default BorderSetting

import { usePageContext } from '../..'
import { BaseStyleSetting } from './BaseStyleSetting'
import BorderSetting from './BorderSetting'
import StyleSettingCss from './style/index.module.scss'
import { Collapse } from '@/lib/Antd'
import { useCreation } from '@/lib/ahook'

const CollapseItems = [
  {
    label: '边框',
    key: 'border',
    children: <BorderSetting></BorderSetting>,
    settingcomponentname: 'BorderSetting',
  },
  {
    label: '基础样式',
    key: 'baseStyle',
    children: <BaseStyleSetting></BaseStyleSetting>,
    settingcomponentname: 'BaseStyleSetting',
  },
]

export function StyleSetting() {
  const { curComponent } = usePageContext()

  const settingComponent = useCreation(() => {
    if (curComponent) {
      return Object.values(curComponent?.setting.styleSetting)
        .filter(v => CollapseItems.some(collapseItem => collapseItem.settingcomponentname === v.settingComponentName))
        .map(v => CollapseItems.find(collapseItem => collapseItem.settingcomponentname === v.settingComponentName)!)
    }
    return []
  }, [curComponent])

  return (
    <div className="h-[100%]">
      <Collapse className={StyleSettingCss.StyleSetting} items={settingComponent}></Collapse>
    </div>
  )
}

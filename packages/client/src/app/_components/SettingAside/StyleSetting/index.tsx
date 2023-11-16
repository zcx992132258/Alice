import { lazy } from 'react'
import { usePageContext } from '../..'
import BorderSetting from './BorderSetting'
import { Collapse } from '@/lib/Antd'
import { useCreation } from '@/lib/ahook'

const CollapseItems = [
  {
    label: '边框',
    key: 'border',
    children: <BorderSetting></BorderSetting>,
    settingcomponentname: 'BorderSetting',
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
      <Collapse items={settingComponent}></Collapse>
    </div>
  )
}

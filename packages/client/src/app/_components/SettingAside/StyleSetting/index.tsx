import { memo } from 'react'
import type { Component } from '@alice/types'
import { usePageContext } from '../..'
import { BaseStyleSetting, BorderSetting } from './ComponentSetting'
import { LineSizeSetting, TagLabelSetting } from './GraphicAttributeSetting'
import StyleSettingCss from './style/index.module.scss'
import { BASE_LINE_CHARTS } from '@/constants'
import { Collapse } from '@/lib/Antd'
import { useCreation } from '@/lib/ahook'

const componentSettingCollapseItems = [
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

const graphicAttributeSettingCollapseItems = {
  [BASE_LINE_CHARTS]: [
    {
      label: '大小',
      key: 'size',
      children: <LineSizeSetting></LineSizeSetting>,
      settingcomponentname: 'LineSizeSetting',
    },
    {
      label: '标签',
      key: 'tag',
      children: <TagLabelSetting></TagLabelSetting>,
      settingcomponentname: 'TagLabelSetting',
    },
  ],
}

const GraphicAttributeSetting = memo((props: { component?: Component }) => {
  if (props.component) {
    const { type } = props.component
    if (type in graphicAttributeSettingCollapseItems) {
      const data = graphicAttributeSettingCollapseItems[type as keyof typeof graphicAttributeSettingCollapseItems]
      return (
        <>
          <p className="leading-[48px] bg-[#f5f5f5] font-bold px-[16px] rounded-[4px]">视图样式</p>
          <Collapse className={StyleSettingCss.StyleSetting} ghost items={data}></Collapse>
        </>
      )
    }
  }
  return <></>
})

const ComponentSetting = memo((props: { setting: typeof componentSettingCollapseItems }) => {
  return props.setting.length
    ? (
      <>
        <p className="leading-[48px] bg-[#f5f5f5] font-bold px-[16px] rounded-[4px]">组件样式</p>
        <Collapse className={StyleSettingCss.StyleSetting} ghost items={props.setting}></Collapse>
      </>
      )
    : <></>
})

export const StyleSetting = memo(() => {
  const { curComponent } = usePageContext()

  const baseSettingComponent = useCreation(() => {
    if (curComponent) {
      return Object.values(curComponent?.setting.styleSetting)
        .filter(v => componentSettingCollapseItems.some(collapseItem => collapseItem.settingcomponentname === v.settingComponentName))
        .map(v => componentSettingCollapseItems.find(collapseItem => collapseItem.settingcomponentname === v.settingComponentName)!)
    }
    return []
  }, [curComponent])

  return (
    <div className="h-[100%] bg-white overflow-auto">
      <GraphicAttributeSetting component={curComponent}></GraphicAttributeSetting>
      <ComponentSetting setting={baseSettingComponent}></ComponentSetting>
    </div>
  )
})

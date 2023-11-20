'use client'
import type { Component, IMenu, IMenuData } from '@lowCode/types'
import type {
  Dispatch,
  SetStateAction,
} from 'react'
import {
  createContext,
  useContext,
  useState,
} from 'react'
import type { Layout } from 'react-grid-layout'
import { useComponent, useCurComponent, useSettingAside } from '../_hooks'
import { BASE_LINE_CHARTS } from '@/constants'

interface DroppingItem {
  i: string
  w: number
  h: number
}

const menuData: IMenu[] = [
  {
    label: '折线图',
    iconType: 'icon-zhexiantu2',
    activeIconTYpe: 'icon-zhexiantu1',
    data: [
      {
        name: '基础折线图',
        type: BASE_LINE_CHARTS,
        chartOptions: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line',
            },
          ],
        },
        height: 3,
        width: 3,
        setting: {
          styleSetting: {
            border: {
              componentName: null,
              color: ['#1677FF', '#5b96d9ab'],
              backgroundColor: 'transparent',
              reverse: true,
              title: '',
              titleWidth: 250,
              settingComponentName: 'BorderSetting',
            },
          },
        },
      },
    ],
  },
]

const PageContext = createContext<{
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
  componentData: Component[]
  handleAddComponentData: (data: IMenuData, layout: Layout, id: string) => void
  layout: Layout[]
  menuData: IMenu[]
  droppingItem: DroppingItem | undefined
  setDroppingItem: Dispatch<SetStateAction<DroppingItem | undefined>>
  handleCopyComponent: (data: Component) => void
  setCurComponent: Dispatch<SetStateAction<Component | undefined>>
  curComponent: Component | undefined
  handleSetCurComponent: (data: Component, force?: boolean) => void
  handleDeleteComponent: (id: string) => void
  settingCollapsed: boolean
  setSettingCollapsed: Dispatch<SetStateAction<boolean>>
  handleSetComponentLayout: (data: Layout[]) => void
  handleSetComponent: (data: Component[]) => void
  componentDataMap: Map<string, Component>
} | null>(null)

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  const {
    handleAddComponentData,
    componentData,
    layout,
    handleCopyComponent,
    handleDeleteComponent,
    handleSetComponentLayout,
    componentDataMap,
    handleSetComponent,
  } = useComponent()

  const { curComponent, setCurComponent, handleSetCurComponent } = useCurComponent()

  const { settingCollapsed, setSettingCollapsed } = useSettingAside()

  const [
    droppingItem,
    setDroppingItem,
  ] = useState<DroppingItem>()

  return (
    <PageContext.Provider value={{
      collapsed,
      setCollapsed,
      componentData,
      handleAddComponentData,
      layout,
      menuData,
      droppingItem,
      setDroppingItem,
      handleCopyComponent,
      curComponent,
      setCurComponent,
      handleSetCurComponent,
      handleDeleteComponent,
      settingCollapsed,
      setSettingCollapsed,
      handleSetComponentLayout,
      componentDataMap,
      handleSetComponent,
    }}
    >
      {children}
    </PageContext.Provider>
  )
}

export function usePageContext() {
  const context = useContext(PageContext)
  if (!context)
    throw new Error('usePageContext must be used within a PageProvider')

  return context
}

'use client'
import type { Component, IMenu, IMenuData } from '@lowCode/types'
import type {
  Dispatch,
  SetStateAction,
} from 'react'
import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { Layout } from 'react-grid-layout'
import { BASE_LINE_CHARTS } from '@/constants'

interface DroppingItem {
  i: string
  w: number
  h: number
}

const menuData: IMenu[] = [
  {
    label: '折线图',
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
        height: 5,
        width: 5,
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
} | null>(null)

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [componentData, setComponentData] = useState<Component[]>([])
  const [droppingItem, setDroppingItem]
   = useState<DroppingItem>()
  const layout = useMemo(() => {
    return componentData.map((v) => {
      return v.layout
    })
  }, [componentData])

  const handleAddComponentData = (data: IMenuData, layout: Layout, id: string) => {
    setComponentData([
      ...componentData,
      {
        ...data,
        id,
        layout: {
          ...layout,
          h: data.height,
          w: data.width,
          i: id,
        },
      },
    ])
  }

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
    }}
    >
      {children}
    </PageContext.Provider>
  )
}

export function usePageContext() {
  const context = useContext(PageContext)
  if (!context) {
    throw new Error('usePageContext must be used within a PageProvider')
  }
  return context
}

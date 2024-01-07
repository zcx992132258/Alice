'use client'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import type { Layout } from 'react-grid-layout'
import { Responsive, WidthProvider } from 'react-grid-layout'
import type { IMenuData } from '@alice/types'
import { memo } from 'react'
import { usePageContext } from './Context'
import { LayoutComponent } from '.'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export const Container = memo(() => {
  const {
    handleAddComponentData,
    handleSetComponentLayout,
    layout,
    componentData,
    setDroppingItem,
    droppingItem,
    handleSetCurComponent,
    componentDataMap,
    curComponent,
    setCurComponent,
  } = usePageContext()

  const handleDrop = (layout: Layout[], item: Layout, e: DragEvent) => {
    if (e.dataTransfer) {
      const strData = e.dataTransfer.getData('text/plain')
      if (strData) {
        const data = JSON.parse(strData) as IMenuData
        if (droppingItem) {
          handleAddComponentData(data, item, droppingItem.i)
          setDroppingItem(undefined)
        }
      }
    }
  }

  const setCurComponentLayout = (layouts: Layout[]) => {
    if (curComponent) {
      const layout = layouts.find(v => v.i === curComponent.layout.i)
      if (layout) {
        setCurComponent({
          ...curComponent,
          layout,
        })
      }
    }
  }

  const handleResizeStop = (layouts: Layout[]) => {
    handleSetComponentLayout(layouts)
    setCurComponentLayout(layouts)
  }

  const handleDragStop = (layouts: Layout[]) => {
    handleSetComponentLayout(layouts)
    setCurComponentLayout(layouts)
  }

  const handleDragStart = (layouts: Layout[], oldItem: Layout, newItem: Layout) => {
    const data = componentData.find(v => v.id === newItem.i)
    if (data) {
      const component = componentDataMap.get(data.id)
      if (component)
        handleSetCurComponent(component, true)
    }
  }
  return (
    <ResponsiveReactGridLayout
      className="overflow-auto"
      onDrop={handleDrop}
      layouts={{
        lg: layout,
        md: layout,
        sm: layout,
        xs: layout,
        xxs: layout,
      }}
      onDragStart={handleDragStart}
      droppingItem={droppingItem}
      isDroppable
      useCSSTransforms
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 320 }}
      cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
      style={{ height: '100%' }}
      onResizeStop={handleResizeStop}
      onDragStop={handleDragStop}
    >
      {
        componentData.map(v => <div key={v.id}><LayoutComponent {...v} /></div>)
      }

    </ResponsiveReactGridLayout>
  )
})

export default Container

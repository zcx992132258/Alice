'use client'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import type { Layout } from 'react-grid-layout'
import { Responsive, WidthProvider } from 'react-grid-layout'
import type { IMenuData } from '@lowCode/types'
import { usePageContext } from './Context'
import { LayoutComponent } from '.'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
export function Container() {
  const {
    handleAddComponentData,
    layout, componentData, setDroppingItem, droppingItem,
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

  return (
    <ResponsiveReactGridLayout
      className='overflow-auto'
      onDrop={handleDrop}
      layouts={{
        lg: layout,
      }}
      droppingItem={droppingItem}
      isDroppable
      useCSSTransforms
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
      style={{ height: '100%' }}
    >
      {
        componentData.map(v => <div key={v.id}><LayoutComponent {...v} /></div>)
      }

    </ResponsiveReactGridLayout>
  )
}

export default Container

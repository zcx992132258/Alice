'use client'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
export function Container() {
  const layout = [
    { i: 'a', x: 0, y: 1, w: 1, h: 1 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2 },
    { i: 'c', x: 4, y: 0, w: 1, h: 1 },
  ]

  return (
    <ResponsiveReactGridLayout
      layouts={{
        lg: [{ i: 'a', x: 0, y: 1, w: 1, h: 1 }],
      }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 0 }}
      style={{ height: '100%' }}
      key='a'
    >
      <div style={{ border: '1px solid' }} key='a'>
        a
      </div>
      <GridLayout layout={layout} cols={12} width='100%'>
        <div style={{ border: '1px solid' }} key='a'>
          a
        </div>
        <div style={{ border: '1px solid' }} key='b'>
          b
        </div>
        <div style={{ border: '1px solid' }} key='c'>
          c
        </div>
      </GridLayout>
    </ResponsiveReactGridLayout>
  )
}

export default Container

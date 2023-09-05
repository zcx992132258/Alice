import type { Component } from '@lowCode/types'
import type { LazyExoticComponent } from 'react'
import { Suspense, useMemo } from 'react'
import { BaseLineCharts, Loading } from '@/components'
import { BASE_LINE_CHARTS } from '@/constants'

export function LayoutComponent(props: Component) {
  const componentMap: Record<string, LazyExoticComponent<(props: Component) => JSX.Element>> = {
    [BASE_LINE_CHARTS]: BaseLineCharts,
  }

  const CurComponent = useMemo(() => {
    if (props.type in componentMap) {
      return componentMap[props.type]
    }
    return null
  }, [props.type])

  return (
    <div className='h-[100%] w-[100%] bg-[#ffffff]'>

      <Suspense fallback={<Loading className='  flex items-center justify-center' />}>
        {
        CurComponent ? <CurComponent {...props} /> : null
       }
      </Suspense>
    </div>
  )
}

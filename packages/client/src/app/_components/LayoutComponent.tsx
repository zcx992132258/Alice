import type { Component } from '@alice/types'
import type { CSSProperties, LazyExoticComponent } from 'react'
import { Suspense, memo } from 'react'
import { ToolPopover, usePageContext } from '.'
import { BaseLineCharts, Loading } from '@/components'
import { BASE_LINE_CHARTS } from '@/constants'
import { useCreation } from '@/lib/ahook'
import BorderWrap from '@/components/BorderWrap'

export const LayoutComponent = memo((props: Component) => {
  const componentMap: Record<string, LazyExoticComponent<(props: Component) => JSX.Element>> = {
    [BASE_LINE_CHARTS]: BaseLineCharts,
  }

  const { curComponent } = usePageContext()

  const isCurComponent = useCreation(() => {
    return props.id === curComponent?.id
  }, [curComponent, props.id])

  const CurComponent = useCreation(() => {
    if (props.type in componentMap)
      return componentMap[props.type]
    return null
  }, [props.type])

  const style = useCreation<CSSProperties>(() => {
    const backgroundImage: CSSProperties = {
      backgroundImage: `url(${props.setting.styleSetting.baseStyle.useBackgroundImage ? props.setting.styleSetting.baseStyle.backgroundImage || '' : ''})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
    }
    const useBackgroundImage = props.setting.styleSetting.baseStyle.useBackgroundImage
    return ({
      padding: `${props.setting.styleSetting.baseStyle.padding || 0}%`,
      borderRadius: `${props.setting.styleSetting.baseStyle.borderRadius || 0}px`,
      backgroundColor: props.setting.styleSetting.baseStyle.useBackgroundColor ? props.setting.styleSetting.baseStyle.backgroundColor || '#fdfdfd00' : '#fdfdfd00',
      ...useBackgroundImage ? { ...backgroundImage } : {},
    })
  }, [isCurComponent, props])

  const activeBorder = useCreation<CSSProperties>(() => {
    return {
      border: isCurComponent ? '1px solid #1677ff' : '1px solid transparent',
    }
  }, [isCurComponent, props])

  return (
    <ToolPopover id={props.id}>
      <div className="h-[100%] w-[100%]" style={activeBorder}>
        <div
          className="h-[100%] w-[100%] "
          style={style}
        >
          <BorderWrap {...props.setting.styleSetting.border}>
            <Suspense fallback={<Loading className="flex items-center justify-center" />}>
              {
            CurComponent ? <CurComponent {...props} /> : null
          }
            </Suspense>
          </BorderWrap>

        </div>
      </div>
    </ToolPopover>
  )
})

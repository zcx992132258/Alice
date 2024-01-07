'use client'
import type { Component } from '@alice/types'
import { memo, useRef } from 'react'
import styleCss from './index.module.scss'
import * as BorderComponents from '@/lib/DataV'
import { useCreation, useSize } from '@/lib/ahook'

const components = Object.entries(BorderComponents).map((v) => {
  const [key, Component] = v
  return {
    key,
    Component,
  }
})

type TBorder = Component['setting']['styleSetting']['border']
interface props extends TBorder {
  children: React.ReactNode
}

export const BorderWrap = memo((props: props) => {
  const { componentName } = props
  const ref = useRef<HTMLDivElement>(null)
  const size = useSize(ref)
  const BorderComponent = useCreation(() => {
    return components.find(v => v.key === componentName)?.Component
  }, [componentName])

  const style = useCreation(() => {
    return {
      height: size?.height,
      width: size?.width,
    }
  }, [size])
  return (
    <div className={`h-[100%] w-[100%] ${styleCss.borderWrap}`} ref={ref}>
      {BorderComponent
        ? (
          <BorderComponent className={styleCss.border} style={style} color={props.color}>
            { props.children}
          </BorderComponent>
          )
        : props.children}
    </div>
  )
})

export default BorderWrap

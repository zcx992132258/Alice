import { lazy } from 'react'

import style from './style/index.module.scss'

export * from './Context'

export * from './LayoutComponent'

export const SiderMenu = lazy(() => import('./SiderMenu'))

export const CollapseMenu = lazy(() => import('./CollapsedButton'))

export const DragWrap = lazy(() => import('./DragWrap'))

export const DragItem = lazy(() => import('./DragItem'))

export const Container = lazy(() => import('./Container'))

export {
  style,
}

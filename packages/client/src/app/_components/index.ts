import { lazy } from 'react'

import style from './style/index.module.scss'

export * from './Context'

export * from './LayoutComponent'

export const SiderMenu = lazy(() => import('./SiderMenu'))

export const CollapseMenu = lazy(() => import('./SiderMenu/CollapsedButton'))

export const DragWrap = lazy(() => import('./DragWrap'))

export const DragItem = lazy(() => import('./DragWrap/DragItem'))

export const Container = lazy(() => import('./Container'))

export const SettingAside = lazy(() => import('./SettingAside'))

export { ToolPopover } from './ToolPopover'

export {
  style,
}

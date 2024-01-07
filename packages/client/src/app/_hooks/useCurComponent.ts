import type { Component } from '@alice/types'
import { useState } from 'react'

export function useCurComponent() {
  const [curComponent, setCurComponent] = useState<Component>()

  const handleSetCurComponent = (component: Component, force?: boolean) => {
    if (curComponent?.id !== component.id || force)
      setCurComponent(component)
  }

  return { curComponent, handleSetCurComponent, setCurComponent }
}

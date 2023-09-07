import type { Component } from '@lowCode/types'
import { useState } from 'react'

export function useCurComponent() {
  const [curComponent, setCurComponent] = useState<Component>()

  const handleSetCurComponent = (component: Component) => {
    if (curComponent?.id !== component.id) {
      setCurComponent(component)
    }
  }

  return { curComponent, handleSetCurComponent, setCurComponent }
}

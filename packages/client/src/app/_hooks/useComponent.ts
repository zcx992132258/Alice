import type { Component, IMenuData } from '@lowCode/types'
import { useCallback, useMemo, useState } from 'react'
import type { Layout } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'

export function useComponent() {
  const [componentData, setComponentData] = useState<Component[]>([])

  const uniqueNamesSet = useMemo(() => {
    return new Set(componentData.map(v => v.name))
  }, [componentData])

  const layout = useMemo(() => {
    return componentData.map((v) => {
      return v.layout
    })
  }, [componentData])

  const isNameUnique = useCallback((name: string) => !uniqueNamesSet.has(name), [uniqueNamesSet])

  const renameDuplicate = (name: string) => {
    if (!isNameUnique(name)) {
      let count = 1
      let newName = `${name}-copy-1`
      while (!isNameUnique(newName)) {
        count += 1
        newName = `${name}-copy-${count}`
      }
      return newName
    }
    return name
  }

  const handleAddComponentData = (data: IMenuData, layout: Layout, id: string) => {
    setComponentData([
      ...componentData,
      {
        ...data,
        name: renameDuplicate(data.name),
        id,
        layout: {
          ...layout,
          h: data.height,
          w: data.width,
          i: id,
        },
      },
    ])
  }

  const handleDeleteComponent = (id: string) => {
    setComponentData(componentData.filter(v => v.id !== id))
  }

  const handleCopyComponent = (data: Component) => {
    const id = uuid()
    handleAddComponentData({
      name: data.name,
      chartOptions: data.chartOptions,
      type: data.type,
      height: data.layout.h,
      width: data.layout.w,
    }, {
      ...data.layout,
      x: 0,
      y: 0,
      i: id,
    }, id)
  }

  return {
    componentData,
    handleAddComponentData,
    setComponentData,
    handleCopyComponent,
    layout,
    handleDeleteComponent,
  }
}

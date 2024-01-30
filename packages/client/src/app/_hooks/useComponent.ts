import type { Component, IMenuData } from '@alice/types'
import { useCreation, useMemoizedFn } from 'ahooks'
import { useState } from 'react'
import type { Layout } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import { cloneDeep } from 'lodash-es'

export function useComponent() {
  const [componentData, setComponentData] = useState<Component[]>([])

  const uniqueNamesSet = useCreation(() => {
    return new Set(componentData.map(v => v.name))
  }, [componentData])

  const componentDataMap = useCreation(() => {
    const map = new Map<string, Component>()
    for (const i of componentData)
      map.set(i.id, i)
    return map
  }, [componentData])

  const layout = useCreation(() => {
    return componentData.map((v) => {
      return v.layout
    })
  }, [componentData])

  const isNameUnique = useMemoizedFn((name: string) => !uniqueNamesSet.has(name))

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
    const { height, width, ...value } = data
    setComponentData([
      ...componentData,
      {
        ...value,
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
    handleAddComponentData(cloneDeep({
      ...data,
      name: data.name,
      chartOptions: data.chartOptions,
      type: data.type,
      height: data.layout.h,
      width: data.layout.w,
    }), cloneDeep({
      ...data.layout,
      x: 0,
      y: 0,
      i: id,
    }), id)
  }

  const handleSetComponentLayout = (data: Layout[]) => {
    const iArr = data.map(v => v.i)
    setComponentData((componentData) => {
      return componentData.map((v) => {
        if (iArr.includes(v.id)) {
          return {
            ...v,
            layout: data.find(val => val.i === v.id)!,
          }
        }
        return v
      })
    })
  }
  const handleSetComponent = (data: Component[]) => {
    setComponentData((componentData) => {
      return componentData.map((v) => {
        const value = data.find(val => val.id === v.id)
        if (value) {
          return {
            ...value,
          }
        }
        return v
      })
    })
  }

  return {
    componentData,
    handleAddComponentData,
    setComponentData,
    handleCopyComponent,
    layout,
    handleDeleteComponent,
    handleSetComponentLayout,
    componentDataMap,
    handleSetComponent,
  }
}

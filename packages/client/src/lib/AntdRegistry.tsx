'use client'
import React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'

export function AntdRegistry({ children }: React.PropsWithChildren) {
  const isServerInserted = React.useRef<boolean>(false)
  const cache = React.useMemo<Entity>(() => createCache(), [])

  useServerInsertedHTML(() => {
    // 避免 css 重复插入
    if (isServerInserted.current)
      return

    isServerInserted.current = true
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    )
  })
  return (
    <StyleProvider cache={cache}>
      {children}
    </StyleProvider>
  )
}

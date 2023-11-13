'use client'

import React from 'react'

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'

// import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs/lib'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { useServerInsertedHTML } from 'next/navigation'

function StyledComponentsRegistry({ children }: React.PropsWithChildren) {
  const cache = React.useMemo<Entity>(() => createCache(), [])
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ))
  return <StyleProvider cache={cache}>{children}</StyleProvider>
}

export default StyledComponentsRegistry

'use client'
import type {
  Dispatch,
  SetStateAction,
} from 'react'
import {
  createContext,
  useContext,
  useState,
} from 'react'

const PageContext = createContext<{
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
} | null>(null)

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <PageContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePageContext() {
  const context = useContext(PageContext)
  if (!context) {
    throw new Error('usePageContext must be used within a PageProvider')
  }
  return context
}

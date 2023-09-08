import { useState } from 'react'

export function useSettingAside() {
  const [settingCollapsed, setSettingCollapsed] = useState(true)

  return {
    settingCollapsed,
    setSettingCollapsed,
  }
}

'use client'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { useMemo, useState } from 'react'
import { first } from 'lodash-es'
import { DragItem, DragWrap, style, usePageContext } from '.'

const { Sider } = Layout

export function SiderMenu() {
  const { menuData } = usePageContext()
  const items: MenuProps['items'] = menuData.map(data => ({
    key: data.label,
    label: data.label,
  }))

  const [selectedKeys, setSelectedKeys] = useState<string[]>([menuData[0].label])

  const selectedMenuData = useMemo(() => {
    const value = first(selectedKeys)
    if (value) {
      return menuData.find(v => v.label === value)?.data || []
    }
    return []
  }, [selectedKeys])

  const { collapsed } = usePageContext()

  return (
    <Sider
      collapsed={collapsed}
      width={400}
      collapsedWidth={0}
      style={{
        background: '#ffffff',
      }}
      className={style.siderMenu}
    >
      <div className={style.menuWrap}>
        <Menu
          onClick={data => setSelectedKeys([data.key])}
          selectedKeys={selectedKeys}
          className={style.menuItem}
          theme='light'
          mode='inline'
          items={items}
        />
      </div>
      <DragWrap>
        {
          selectedMenuData.map((v) => {
            return <DragItem key={v.name} {...v} />
          })
        }
      </DragWrap>
    </Sider>
  )
}

export default SiderMenu

'use client'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { useMemo, useState } from 'react'
import { first } from 'lodash-es'
import { DragItem, DragWrap, style, usePageContext } from '.'

const { Sider } = Layout

const MenuData = [
  {
    label: '折线图',
    data: [
      {
        name: '基础折线图',
      },
    ],
  },
]

export function SiderMenu() {
  const items: MenuProps['items'] = MenuData.map((data, index) => ({
    key: data.label,
    label: data.label,
  }))

  const [selectedKeys, setSelectedKeys] = useState<string[]>([MenuData[0].label])

  const selectedMenuData = useMemo(() => {
    const value = first(selectedKeys)
    if (value) {
      return MenuData.find(v => v.label === value)?.data || []
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
          theme="light"
          mode="inline"
          items={items}
        />
      </div>
      <DragWrap>
        {
          selectedMenuData.map((v) => {
            return <DragItem key={v.name} {...v}></DragItem>
          })
        }
      </DragWrap>
    </Sider>
  )
}

export default SiderMenu

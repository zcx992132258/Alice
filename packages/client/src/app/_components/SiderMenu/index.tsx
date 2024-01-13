'use client'
import type { MenuProps } from 'antd'
import { Layout, Menu, Tooltip } from 'antd'
import { memo, useState } from 'react'
import { first } from 'lodash-es'
import { useCreation } from 'ahooks'
import { IconFont } from '@alice/client/lib/Icon'
import { DragItem, DragWrap, style, usePageContext } from '..'

const { Sider } = Layout

const MenuItem
  = memo(({ label, value, iconType }: { label: string, value?: string, iconType: string }) => {
    return (
      <Tooltip title={label}>
        <IconFont
          style={{
            fontSize: '24px',
            color: value === label ? '#1677ff' : '#e5e7eb',
          }}
          type={iconType}
        />
      </Tooltip>
    )
  })

export function SiderMenu() {
  const { menuData } = usePageContext()

  const [selectedKeys, setSelectedKeys] = useState<string[]>([menuData[0].label])

  const items: MenuProps['items'] = useCreation(() => {
    const value = first(selectedKeys)
    return menuData.map(data => ({
      key: data.label,
      label: <MenuItem value={value} label={data.label} iconType={data.iconType} />,
    }))
  }, [selectedKeys])

  const selectedMenuData = useCreation(() => {
    const value = first(selectedKeys)
    if (value)
      return menuData.find(v => v.label === value)?.data || []

    return []
  }, [selectedKeys])

  const { collapsed } = usePageContext()

  return (
    <Sider
      collapsed={collapsed}
      width={200}
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
            return <DragItem key={v.name} {...v} />
          })
        }
      </DragWrap>
    </Sider>
  )
}

export default SiderMenu

'use client'

import { IconFont } from '@alice/client/lib/Icon'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { usePathname, useRouter } from 'next/navigation'

const MenuItems: MenuProps['items'] = [
  {
    label: '数据源',
    key: '/dataSource',
    icon: <IconFont type="icon-shujuyuan"></IconFont>,
  },
]
export function DashboardMenu() {
  const pathname = usePathname()
  const selectedKeys = [MenuItems.find(v => pathname.includes(v.key?.toString()))]
    .map(v => v?.key.toString())
    .filter(v => !!v)
  return <Menu mode="horizontal" defaultSelectedKeys={selectedKeys} items={MenuItems}></Menu>
}

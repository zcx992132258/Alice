'use client'

import type { MenuProps } from '@alice/client/lib/Antd'
import { Menu } from '@alice/client/lib/Antd'
import { IconFont } from '@alice/client/lib/Icon'
import { useRouter } from 'next/navigation'

const MenuItems: MenuProps['items'] = [
  {
    label: '数据源',
    key: 'dataSource',
    icon: <IconFont type="icon-shujuyuan"></IconFont>,
  },
]
export function DashboardMenu() {
  const router = useRouter()
  return <Menu mode="horizontal" items={MenuItems}></Menu>
}

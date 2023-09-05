'use client'
import { Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { style, usePageContext } from '.'

export function CollapsedButton() {
  const { collapsed, setCollapsed } = usePageContext()
  return (
    <Button
      type='text'
      className={style.btn}
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
    />
  )
}

export default CollapsedButton

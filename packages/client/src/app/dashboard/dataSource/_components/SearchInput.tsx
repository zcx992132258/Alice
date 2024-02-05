'use client'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import debounce from 'lodash-es/debounce'
import { useDataSourceStore } from '../_store'

export function SearchInput() {
  const searchDataSourceList = debounce(useDataSourceStore(state => state.searchDataSourceList), 300)
  return (
    <Input
      className="max-w-[300px]"
      style={{ width: '30%' }}
      onChange={(e) => {
        searchDataSourceList(e.target.value)
      }}
      placeholder="请输入数据源名称"
      prefix={<SearchOutlined />}
    />
  )
}

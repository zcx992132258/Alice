'use client'
import type { TableProps } from 'antd'
import { Pagination, Table } from 'antd'
import type { IDataSource } from '@alice/types/DataSource'
import { useMount } from 'ahooks'
import { useDataSourceStore } from '../_store'

export function SourceTable() {
  const setPageSize = useDataSourceStore(state => state.setPageSize)
  const getDataSourceList = useDataSourceStore(state => state.getDataSourceList)
  const dataSourceList = useDataSourceStore(state => state.dataSourceList)
  const loading = useDataSourceStore(state => state.loading)
  const total = useDataSourceStore(state => state.total)
  const size = useDataSourceStore(state => state.size)
  const page = useDataSourceStore(state => state.page)

  const columns: TableProps<IDataSource>['columns'] = [
    {
      title: '数据源名称',
      dataIndex: 'aliasName',
      key: 'aliasName',
    },
    {
      title: '地址',
      dataIndex: 'host',
      key: 'host',
      render: (_, { host, port }) => {
        return `${host}:${port}`
      },
    },
    {
      title: '数据库名称',
      dataIndex: 'database',
      key: 'database',
    },
    {
      title: '表名称',
      dataIndex: 'tableName',
      key: 'tableName',
    },
  ]

  useMount(() => getDataSourceList())

  return (
    <div className="h-[calc(100% - 32px)] pt-[12px]">
      <Table loading={loading} pagination={false} dataSource={dataSourceList} columns={columns} />
      <Pagination
        hideOnSinglePage
        defaultCurrent={page}
        defaultPageSize={size}
        total={total}
        onChange={(page, size) => {
          setPageSize(page, size)
          getDataSourceList()
        }}
      >
      </Pagination>
    </div>
  )
}

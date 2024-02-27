'use client'
import type { TableProps } from 'antd'
import { Pagination, Table, Tooltip } from 'antd'
import type { IDataSource } from '@alice/types/DataSource'
import { useMount } from 'ahooks'
import { EditOutlined, FileSearchOutlined } from '@ant-design/icons'
import { useRef } from 'react'
import { useDataSourceStore } from '../_store'
import { EditDataSource } from './EditDataSource'
import { PreviewDataSourceModal } from './PreviewDataSourceModal'

export function SourceTable() {
  const setPageSize = useDataSourceStore(state => state.setPageSize)
  const getDataSourceList = useDataSourceStore(state => state.getDataSourceList)
  const dataSourceList = useDataSourceStore(state => state.dataSourceList)
  const loading = useDataSourceStore(state => state.loading)
  const total = useDataSourceStore(state => state.total)
  const size = useDataSourceStore(state => state.size)
  const page = useDataSourceStore(state => state.page)
  const EditDataSourceRef = useRef<{
    init: (data: IDataSource) => Promise<void>
  }>()
  const PreviewDataSourceModalRef = useRef<{
    init: (id: number) => Promise<void>
  }>()

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
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
      render: (_, data) => {
        return (
          <>
            <Tooltip title="编辑">
              <EditOutlined className="cursor-pointer" onClick={() => EditDataSourceRef.current.init(data)} />
            </Tooltip>
            <Tooltip title="预览">
              <FileSearchOutlined className="cursor-pointer" onClick={() => PreviewDataSourceModalRef.current.init(data.id)} />
            </Tooltip>
          </>
        )
      },
    },
  ]

  useMount(() => getDataSourceList())

  return (
    <div className="h-[calc(100% - 32px)] pt-[12px]">
      <EditDataSource ref={EditDataSourceRef}></EditDataSource>
      <PreviewDataSourceModal ref={PreviewDataSourceModalRef}></PreviewDataSourceModal>
      <Table loading={loading} pagination={false} dataSource={dataSourceList} columns={columns} rowKey="id" />
      <Pagination
        hideOnSinglePage
        defaultCurrent={page}
        defaultPageSize={size}
        total={total}
        onChange={(page, size) => {
          setPageSize(page, size)
          getDataSourceList()
        }}
      />
    </div>
  )
}

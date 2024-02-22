import { apiPreviewDataSource } from '@alice/client/api/dataSource'
import type { IPreviewDataSource } from '@alice/types/DataSource'
import type { TableProps } from 'antd'
import { Modal, Spin, Table } from 'antd'

import { forwardRef, useImperativeHandle, useState } from 'react'

export const PreviewDataSourceModal = forwardRef(
  (props: object, ref) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [colum, setColum] = useState<TableProps['columns']>()
    const [tableData, setTableData] = useState<IPreviewDataSource['tableData']>()
    const handleCancel = () => {
      setOpen(false)
    }
    const init = async (id: number) => {
      setLoading(true)
      try {
        setOpen(true)
        const data = await apiPreviewDataSource(id)
        setColum(data.colum.map(v => ({
          title: v.field,
          dataIndex: v.field,
        })))
        setTableData(data.tableData)
      }
      catch (error) {
        console.error(error)
      }
      setLoading(false)
    }

    useImperativeHandle(ref, () => ({ init }))

    return (
      <Modal title="预览数据源" open={open} onCancel={handleCancel} width="900px">
        <Spin spinning={loading}>
          <Table columns={colum} dataSource={tableData} pagination={false} scroll={{ x: true }} />
        </Spin>
      </Modal>
    )
  },
)

'use client'
import { Button, Modal } from '@alice/client/lib/Antd'
import { useRef } from 'react'
import type { TestLinkDto } from '@alice/types/DataSource/dto/testLink.dto'
import { apiTestLink } from '@alice/client/api/dataSource'
import { DataSourceForm } from './DataSourceForm'

export function AddDataSource() {
  const DataSourceFormRef = useRef<{
    validate: () => Promise<TestLinkDto>
  }>()

  const handleOpenModal = () => {
    Modal.info({
      title: '新增数据源',
      width: '600px',
      content: <DataSourceForm ref={DataSourceFormRef}></DataSourceForm>,
      footer: () => {
        return (
          <div>
            <Button
              type="primary"
              onClick={async () => {
                const data = await DataSourceFormRef.current.validate()
                apiTestLink({ ...data, port: data.port.toString() })
              }}
            >
              保存
            </Button>
          </div>
        )
      },
    })
  }
  return <Button type="primary" onClick={handleOpenModal}>新增数据源</Button>
}

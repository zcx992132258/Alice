'use client'
import { Button, Modal, message } from '@alice/client/lib/Antd'
import { useRef, useState } from 'react'
import type { TestLinkDto } from '@alice/types/DataSource/dto/testLink.dto'
import { apiGetTables, apiSaveDataSource, apiTestLink } from '@alice/client/api/dataSource'
import { useDataSourceStore } from '../_store'
import { DataSourceForm } from './DataSourceForm'

export function AddDataSource() {
  const DataSourceFormRef = useRef<{
    validate: () => Promise<{
      database: string
      host: string
      password: string
      port: number
      username: string
      tableName: string
      aliasName: string
    }>
    testLinkValidate: () => Promise<TestLinkDto>
  }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tables, setTables] = useState<string[]>([])
  const [testBtnLoading, setTestBtnLoading] = useState<boolean>(false)
  const [saveBtnLoading, setSaveBtnLoading] = useState<boolean>(false)
  const [testDisabled, setTestDisabled] = useState<boolean>(true)

  const getTables = async (params: TestLinkDto) => {
    const data = await apiGetTables(params)
    setTables(data)
  }

  const handleTestLink = async () => {
    useDataSourceStore.getState().getDataSourceList()
    setTestBtnLoading(true)
    try {
      const params = await DataSourceFormRef.current.testLinkValidate()
      params.port = params.port.toString()
      await apiTestLink(params)
      await getTables(params)
      setTestDisabled(false)
      message.success('测试连接成功')
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setTestBtnLoading(false)
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleAfterCloseModal = () => {
    setTestDisabled(true)
    setTables([])
  }

  const handleSave = async () => {
    setSaveBtnLoading(true)
    try {
      const params = await DataSourceFormRef.current.validate()
      await apiSaveDataSource({
        ...params,
        port: params.port.toString(),
      })
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setSaveBtnLoading(false)
    }
  }

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>新增数据源</Button>
      <Modal
        title="新增数据源"
        width="600px"
        open={isModalOpen}
        afterClose={handleAfterCloseModal}

        footer={() => {
          return (
            <div>
              <Button className="mr-[12px]" loading={testBtnLoading} onClick={handleTestLink}>测试连接</Button>
              <Button
                loading={saveBtnLoading}
                disabled={testDisabled}
                type="primary"
                onClick={handleSave}
              >
                保存
              </Button>
            </div>
          )
        }}
      >
        <DataSourceForm tables={tables} testDisabled={testDisabled} ref={DataSourceFormRef}></DataSourceForm>
      </Modal>
    </>
  )
}

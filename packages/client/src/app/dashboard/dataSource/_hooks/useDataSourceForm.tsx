'use client'
import type { TestLinkDto } from '@alice/types/DataSource'
import { useRef, useState } from 'react'
import { apiGetTables, apiTestLink } from '@alice/client/api/dataSource'
import { Button, message } from 'antd'
import { useDataSourceStore } from '../_store'

export function useDataSourceForm() {
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
    setFieldsValue: () => void
  }>()

  const [tables, setTables] = useState<string[]>([])
  const [testDisabled, setTestDisabled] = useState<boolean>(true)
  const [testBtnLoading, setTestBtnLoading] = useState<boolean>(false)
  const [saveBtnLoading, setSaveBtnLoading] = useState<boolean>(false)

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

  const ModalFooter = (props: { handleSave: () => Promise<void> }) => {
    return (
      <div>
        <Button className="mr-[12px]" loading={testBtnLoading} onClick={handleTestLink}>测试连接</Button>
        <Button
          loading={saveBtnLoading}
          disabled={testDisabled}
          type="primary"
          onClick={props.handleSave}
        >
          保存
        </Button>
      </div>
    )
  }

  return {
    tables,
    setSaveBtnLoading,
    handleTestLink,
    ModalFooter,
    DataSourceFormRef,
    setTables,
    getTables,
    setTestDisabled,
    testDisabled,
  }
}

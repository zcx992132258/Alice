import { forwardRef, useImperativeHandle, useState } from 'react'
import type { IDataSource } from '@alice/types/DataSource'
import { Loading } from '@alice/client/components'
import { Modal, Spin } from 'antd'
import { useDataSourceStore } from '../_store'
import { useDataSourceForm } from '../_hooks/useDataSourceForm'
import { DataSourceForm } from './DataSourceForm'

export const EditDataSource = forwardRef((props: object, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { DataSourceFormRef, tables, setTables, ModalFooter, setSaveBtnLoading, getTables, setTestDisabled, testDisabled } = useDataSourceForm()
  const editDataSource = useDataSourceStore(state => state.editDataSource)
  const getDataSourceList = useDataSourceStore(state => state.getDataSourceList)
  const [sourceDate, setSourceDate] = useState<IDataSource | null>()
  const [loading, setLoading] = useState(false)
  const handleAfterCloseModal = () => {
    setTestDisabled(true)
    setTables([])
    setSourceDate(null)
  }

  const handleSave = async () => {
    setSaveBtnLoading(true)
    try {
      const params = await DataSourceFormRef.current.validate()
      await editDataSource({
        ...params,
        id: sourceDate?.id,
        port: params.port.toString(),
      })
      setIsModalOpen(false)
      getDataSourceList()
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setSaveBtnLoading(false)
    }
  }

  const init = async (data: IDataSource) => {
    setLoading(true)
    try {
      setIsModalOpen(true)
      setSourceDate(data)
      await getTables({
        database: data.database,
        host: data.host,
        password: data.password,
        port: data.port.toString(),
        username: data.username,
      })
      DataSourceFormRef.current.setFieldsValue()
    }
    catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useImperativeHandle(ref, () => ({
    init,
  }))

  return (
    <Modal
      title="新增数据源"
      width="600px"
      open={isModalOpen}
      afterClose={handleAfterCloseModal}
      onCancel={() => setIsModalOpen(false)}
      destroyOnClose
      footer={() => {
        return <ModalFooter handleSave={handleSave}></ModalFooter>
      }}
    >
      <Spin spinning={loading}>
        <DataSourceForm tables={tables} sourceDate={sourceDate} testDisabled={testDisabled} ref={DataSourceFormRef}></DataSourceForm>
      </Spin>
    </Modal>
  )
})

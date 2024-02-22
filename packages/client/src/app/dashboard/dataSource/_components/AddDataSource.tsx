'use client'
import { Button, Modal } from '@alice/client/lib/Antd'
import { useState } from 'react'
import { useDataSourceStore } from '../_store'
import { useDataSourceForm } from '../_hooks/useDataSourceForm'
import { DataSourceForm } from './DataSourceForm'

export function AddDataSource() {
  const { DataSourceFormRef, tables, setTables, ModalFooter, setSaveBtnLoading, testDisabled, setTestDisabled } = useDataSourceForm()

  const saveDataSource = useDataSourceStore(state => state.saveDataSource)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      await saveDataSource({
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
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
        footer={() => {
          return <ModalFooter handleSave={handleSave}></ModalFooter>
        }}
      >
        <DataSourceForm tables={tables} testDisabled={testDisabled} ref={DataSourceFormRef}></DataSourceForm>
      </Modal>
    </>
  )
}

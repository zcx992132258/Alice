import { Form, Input } from '@alice/client/lib/Antd'
import { hostRegex, portRegex } from '@alice/tools/src/regex'
import { forwardRef, useImperativeHandle } from 'react'

export const DataSourceForm = forwardRef((props, ref) => {
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    validate: () => form.validateFields(),
  }))

  return (
    <Form form={form} labelCol={{ span: 5 }}>
      <Form.Item
        name="host"
        label="主机地址"
        rules={[{
          pattern: hostRegex,
          required: true,
          message: '请输入正确主机地址',
        }]}
        initialValue="124.71.190.206"
      >
        <Input placeholder="请输入主机地址"></Input>
      </Form.Item>
      <Form.Item
        name="port"
        label="端口号"
        rules={[{
          pattern: portRegex,
          required: true,
          message: '请输入正确端口号',
        }]}
        initialValue={3306}
      >
        <Input placeholder="请输入端口号"></Input>
      </Form.Item>
      <Form.Item
        name="database"
        label="数据库名称"
        rules={[{
          required: true,
          message: '请输入数据库名称',
        }]}
        initialValue="alice"
      >
        <Input placeholder="请输入数据库名称"></Input>
      </Form.Item>
      <Form.Item
        name="username"
        label="用户名称"
        rules={[{
          required: true,
          message: '请输入用户名称',
        }]}
        initialValue="root"
      >
        <Input placeholder="请输入用户名称"></Input>
      </Form.Item>
      <Form.Item
        name="password"
        label="用户密码"
        rules={[{
          required: true,
          message: '请输入用户密码',
        }]}
        initialValue="Xy297536"
      >
        <Input placeholder="请输入用户密码"></Input>
      </Form.Item>
    </Form>
  )
})

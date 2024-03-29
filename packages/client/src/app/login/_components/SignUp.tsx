'use client'
import Password from 'antd/es/input/Password'
import { useRouter } from 'next/navigation'
import { apiRegister } from '@alice/client/api'
import { useUserStore } from '@alice/client/store'
import { Form, Input, Spin, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useState } from 'react'
import style from './style/index.module.scss'

export function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const login = useUserStore(state => state.login)
  const onFinish = async (values: { username: string, password: string, email: string }) => {
    setLoading(true)
    try {
      await apiRegister({
        username: values.username,
        password: values.password,
        email: values.email,
      })
      await login({
        username: values.username,
        password: values.password,
      })

      message.success('注册成功')
      router.push('/dashboard/dataSource')
    }
    catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <div className={`${style.container__form} ${style['container--signup']}`}>
      <Form labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} className={style.form} onFinish={onFinish}>
        <h2 className={style.form__title}>
          注册
        </h2>
        <FormItem
          className="w-[50%]"
          name="username"
          rules={[{ required: true, message: '请输入用户' }, { max: 8, message: '用户名最多8个字符' }]}
        >
          <Input className={style.input} placeholder="请输入用户" />
        </FormItem>
        <FormItem
          className="w-[50%]"
          name="email"
          rules={[{ required: true, message: '请输入密码' }, { type: 'email', message: '请输入正确邮箱地址' }]}
        >
          <Input className={style.input} placeholder="请输入邮箱" />
        </FormItem>
        <FormItem
          className="w-[50%]"
          name="password"
          rules={[{ required: true, message: '请输入密码' }, { max: 16, message: '密码最多16个字符' }]}
        >
          <Password className={style.input} placeholder="请输入密码" />
        </FormItem>
        <Spin spinning={loading}>
          <button className={style.btn}>注册</button>
        </Spin>
      </Form>

    </div>
  )
}

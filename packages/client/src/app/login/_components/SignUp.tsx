'use client'
import { Form, FormItem, Input } from '@alice/client/lib/Antd'
import Password from 'antd/es/input/Password'
import { signIn } from 'next-auth/react'
import style from './style/index.module.scss'

export function SignUp() {
  const onFinish = async (values: { name: string, password: string, email: string }) => {
    await signIn('email', { email: values.email, password: values.password })
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
          rules={[{ required: true, message: '请输入密码' }, { max: 8, message: '用户名最多8个字符' }]}
        >
          <Password className={style.input} placeholder="请输入密码" />
        </FormItem>
        <button className={style.btn}>注册</button>
      </Form>

    </div>
  )
}
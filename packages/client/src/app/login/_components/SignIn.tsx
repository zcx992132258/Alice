'use client'
import Password from 'antd/es/input/Password'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@alice/client/store'
import { Form, Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import style from './style/index.module.scss'

export function SignIn() {
  const router = useRouter()
  const login = useUserStore(state => state.login)
  const onFinish = async (values: { username: string, password: string }) => {
    await login(values)
    message.success('登录成功')
    router.push('/')
  }

  return (
    <div className={`${style.container__form} ${style['container--signin']}`}>
      <Form labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} className={style.form} onFinish={onFinish}>
        <h2 className={style.form__title}>
          登录
        </h2>
        <FormItem
          className="w-[50%]"
          name="username"
        >
          <Input className={style.input} placeholder="请输入用户" />
        </FormItem>
        <FormItem
          className="w-[50%]"
          name="password"
        >
          <Password className={style.input} placeholder="请输入密码" />
        </FormItem>
        <p className={style.link}>忘记密码?</p>
        <button className={style.btn}>登录</button>
      </Form>
    </div>
  )
}

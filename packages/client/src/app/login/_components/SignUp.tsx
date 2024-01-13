import { Form, FormItem, Input } from '@alice/client/lib/Antd'
import Password from 'antd/es/input/Password'
import style from './style/index.module.scss'

export function SignUp() {
  return (
    <div className={`${style.container__form} ${style['container--signup']}`}>
      <Form labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} className={style.form}>
        <h2 className={style.form__title}>
          注册
        </h2>
        <FormItem
          className="w-[50%]"
          name="username"
        >
          <Input className={style.input} placeholder="请输入用户" />
        </FormItem>
        <FormItem
          className="w-[50%]"
          name="email"
        >
          <Input className={style.input} placeholder="请输入邮箱" />
        </FormItem>
        <FormItem
          className="w-[50%]"
          name="password"
        >
          <Password className={style.input} placeholder="请输入密码" />
        </FormItem>
        <button className={style.btn}>注册</button>
      </Form>

    </div>
  )
}

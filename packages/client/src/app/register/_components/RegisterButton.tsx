'use client'
import { apiRegister } from '@alice/client/api'
import { message } from 'antd'
import Button from 'antd/es/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUserStore } from '@alice/client/store'
import { useState } from 'react'

export function RegisterButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const login = useUserStore(state => state.login)
  const handleRegister = async () => {
    setLoading(true)
    try {
      if (searchParams.has('email') && searchParams.has('id')) {
        const email = searchParams.get('email')
        const id = searchParams.get('id')
        const { username, password } = await apiRegister({
          email,
          id,
        })
        await login({
          username,
          password,
        })
        router.push('/dashboard/dataSource')
      }
      else {
        message.error('注册失败,请检查邮件')
      }
    }
    catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return <Button loading={loading} type="primary" onClick={handleRegister}>进入Alice</Button>
}

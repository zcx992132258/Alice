import { useUserStore } from '@alice/client/store'
import { message } from 'antd'
import axios from 'axios'

export const http = axios.create({
  timeout: 10000,
})
const token = useUserStore(state => state.token)
const clearUser = useUserStore(state => state.clearUser)

http.interceptors.request.use(
  (config) => {
    if (token) {
      message.error('登录过期')
      clearUser()
      location.href = '/login'
      return
    }
    config.headers.Authorization = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    const { code } = response.data
    if (code === '401') {
      clearUser()
      message.error('登录过期')
      location.href = '/login'
    }
    return response.data
  },
)

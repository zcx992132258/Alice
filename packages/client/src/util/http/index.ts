import { useUserStore } from '@alice/client/store'
import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'

export const instance = axios.create({
  timeout: 10000,
  // eslint-disable-next-line node/prefer-global/process
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

instance.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token
    const clearUser = useUserStore.getState().clearUser
    if (!token) {
      if (!config.noAuth) {
        message.error('登录过期')
        clearUser()
        location.href = '/login'
        return
      }
    }
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const { code, message: msg } = error.response.data
    const clearUser = useUserStore.getState().clearUser
    if (code === '401') {
      clearUser()
      message.error('登录过期')
      location.href = '/login'
    }
    if (Number(code) !== 200)
      message.error(msg)
    return Promise.reject(error)
  },
)

export function send<T>(config: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    instance<T>(config)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

export const http = {
  get<T>(url: string, params?: AxiosRequestConfig['params'], config?: AxiosRequestConfig) {
    config = Object.assign(
      { ...config },
      {
        method: 'get',
        url,
        params: params || {},
      },
    )
    return send<T>(config)
  },
  post<T>(url: string, data: AxiosRequestConfig['data'] = {}, config?: AxiosRequestConfig) {
    config = Object.assign(
      { ...config },
      {
        method: 'post',
        url,
        data,
      },
    )
    return send<T>(config)
  },
  put<T>(url: string, data?: AxiosRequestConfig['data'], config?: AxiosRequestConfig) {
    config = Object.assign(
      { ...config },
      {
        method: 'put',
        url,
        data,
      },
    )
    return send<T>(config)
  },
  delete<T>(url: string, params?: AxiosRequestConfig['params'], config?: AxiosRequestConfig) {
    config = Object.assign(
      { ...config },
      {
        method: 'post',
        url,
        params,
      },
    )
    return send<T>(config)
  },
  all<T>(list: Array<T | Promise<T>>) {
    return axios.all(list).then(
      axios.spread((...args) => {
        return args
      }),
    )
  },
}

declare module 'axios' {
  interface AxiosRequestConfig {
    noAuth?: boolean
  }
}
export interface AxiosResponseData<T> {
  code: number
  msg: string
  result: T
}

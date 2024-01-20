export interface AxiosResponseData<T> {
  code: number
  msg: string
  result: T
}

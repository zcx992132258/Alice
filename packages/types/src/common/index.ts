export * from './dto'

export interface IList<T> {
  page: number
  size: number
  total: number
  hasNextPages: boolean
  list: T[]
}

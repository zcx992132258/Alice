export function hasAttribute<T extends object>(key: string | number, data: T): boolean {
  return key in data
}

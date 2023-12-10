export function base64ToFile(base64String: string) {
  const byteCharacters = atob(base64String)
  const byteNumbers: number[] = Array.from({ length: byteCharacters.length })
  for (let i = 0; i < byteCharacters.length; i++)
    byteNumbers[i] = byteCharacters.charCodeAt(i)

  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: 'image/jpeg' })
  const file = new File([blob], 'filename.jpg', { type: 'image/jpeg' }) // 设置文件名和文件类型
  return file
}

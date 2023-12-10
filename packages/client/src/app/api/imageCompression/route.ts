import type { Buffer } from 'node:buffer'
import sharp from 'sharp'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')
  if (file instanceof File) {
    const reader = file!.stream().getReader()
    const chunks: Uint8Array [] = []

    // 读取文件流并存储为数组
    while (true) {
      const { done, value } = await reader.read()
      if (done)
        break
      chunks.push(value)
    }

    // 将数组合并成一个 Uint8Array 类型的数组
    const uint8Array = chunks.reduce((acc, chunk) => {
      const chunkArray = Array.from(chunk)
      return new Uint8Array([...acc, ...chunkArray])
    }, new Uint8Array())

    // 最后将 Uint8Array 转换为 ArrayBuffer
    const fileBuffer = uint8Array.buffer
    const processedImageData = await sharp(fileBuffer).resize({ width: 500 }) // 调整大小
      .toBuffer()
    const base64Data = arrayBufferToBase64(processedImageData)
    // 现在 fileBuffer 就是文件的 ArrayBuffer，可以用于后续的处理
    return Response.json({ data: base64Data, code: 200 }, { status: 200 })
  }

  return Response.json({
    code: 500,
    msg: '上传文件错误',
  }, { status: 200 })
}

function arrayBufferToBase64(buffer: Buffer) {
  const uint8Array = new Uint8Array(buffer)
  const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '')
  return btoa(binaryString)
}

import { Duplex } from 'node:stream'
import { Buffer } from 'node:buffer'

export function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const buffers: Buffer[] = []
    // 创建一个可写流
    const writableStream = new WritableStream({
      write(chunk) {
        buffers.push(chunk)
      },
    })
    stream.pipeTo(writableStream).then(() => resolve(Buffer.concat(buffers))).catch(reject)
  })
}

export function bufferToStream(buffer: Buffer): Duplex {
  const stream = new Duplex()
  stream.push(buffer)
  stream.push(null)
  return stream
}

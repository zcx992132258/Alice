import type { AvifOptions, GifOptions, HeifOptions, Jp2Options, JpegOptions, JxlOptions, OutputOptions, PngOptions, TiffOptions, WebpOptions } from 'sharp'
import sharp from 'sharp'
import { streamToBuffer } from '@alice/tools'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')
  if (file instanceof File) {
    const imagesBuffer = await streamToBuffer(file.stream())
    const metadata = await sharp(imagesBuffer).metadata()
    let options: sharp.SharpOptions = {} // sharp 配置
    let formatOptions: OutputOptions
      | JpegOptions
      | PngOptions
      | WebpOptions
      | AvifOptions
      | HeifOptions
      | JxlOptions
      | GifOptions
      | Jp2Options
      | TiffOptions = {} // 不同格式方法参数

    // 根据文件格式, 设置不同的配置
    switch (metadata.format) {
      case 'gif':
        options = {
          animated: true,
          limitInputPixels: false,
        }
        formatOptions = { colours: 128 }
        break
      case 'raw':
        break
      default:
        formatOptions = { quality: 75 }
    }
    // 压缩: 调用 sharp
    const newBuffer = await ((sharp(imagesBuffer, options) as any)
      ?.[metadata.format!](formatOptions)
      .toBuffer())
    // 现在 fileBuffer 就是文件的 ArrayBuffer，可以用于后续的处理
    return new Response(newBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg', // 设置响应的内容类型
        // 可以根据需要设置其他响应头
      },
    })
  }

  return Response.json({
    code: 500,
    msg: '上传文件错误',
  }, { status: 200 })
}

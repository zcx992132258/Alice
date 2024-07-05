// src/filter/any-exception.filter.ts
/**
 * 捕获所有异常
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { getBody } from '../utils/getBody'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    // 获取客户端 IP 地址
    const ip = request.socket.remoteAddress
    // 获取原始 URL
    const originalUrl = request.url
    // 解析 URL
    const parsedUrl = new URL(`${request.url}`)

    // 获取查询参数
    const queryParams = parsedUrl.searchParams
    const body = await getBody(response)
    // 获取路径
    const path = parsedUrl.pathname
    const pathParams = path.split('/').filter(Boolean) // 分割路径并过滤掉空字符串
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${originalUrl}
    Method: ${request.method}
    IP: ${ip}
    Status code: ${status}
    Parmas: ${JSON.stringify(pathParams)}
    Query: ${JSON.stringify(queryParams)}
    Body: ${JSON.stringify(
      body,
    )} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `
    this.logger.warn(logFormat)
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({
      data: null,
      message: '操作失败',
      code: 500,
    }))
  }
}

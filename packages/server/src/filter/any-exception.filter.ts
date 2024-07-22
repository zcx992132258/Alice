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
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${request.url()}
    Method: ${request.method}
    IP: ${request.ip()}
    Status code: ${status}
    Parmas: ${JSON.stringify(request.query)}
    Query: ${JSON.stringify(request.params)}
    Body: ${JSON.stringify(
      request.body,
    )} 
    ErrorMessage: ${JSON.stringify(exception)}
    \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

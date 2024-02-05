import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { Request } from 'express'
import { isObject, isString } from 'lodash'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp() // 获取请求上下文
    const response = ctx.getResponse() // 获取请求上下文中的 response对象
    const status = exception.getStatus() // 获取异常状态码
    let message: string
    const exceptionResponse = exception.getResponse()
    if (
      typeof exceptionResponse === 'object'
        && 'message' in exceptionResponse
    ) {
      if (Array.isArray(exceptionResponse.message)) {
        message = exceptionResponse.message.length
          ? exceptionResponse.message.join(',')
          : '请求错误'
      }
      else {
        message = isObject(exceptionResponse) ? '操作失败' : `${exceptionResponse}`
      }
    }
    else {
      message = message || isString(exceptionResponse) ? exceptionResponse.toString() : JSON.stringify(exceptionResponse)
    }
    const request = ctx.getRequest<Request>()

    const logFormat = `
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      Request original url: ${request.originalUrl}
      Method: ${request.method}
      IP: ${request.ip}
      Status code: ${status}
      Response: ${exception.toString()}
      message: ${
        message
      }
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `
    this.logger.info(logFormat)
    const errorResponse = {
      data: null,
      message: message || '操作失败',
      code: status,
    }
    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}

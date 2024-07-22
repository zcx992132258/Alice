import querystring from 'node:querystring'
import url from 'node:url'
import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { getBody } from '../utils/getBody'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  async use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const { statusCode: code } = req
    next()
    // 获取客户端 IP 地址
    const ip = req.socket.remoteAddress
    // 获取原始 URL
    const originalUrl = req.url

    // 解析 URL
    const parsedUrl = new URL(`${req.protocol as string}://${req.hostname as string}${req.url}`)

    // 获取查询参数
    const queryParams = parsedUrl.searchParams
    const body = await getBody(req)
    // 获取路径
    const path = parsedUrl.pathname
    const pathParams = path.split('/').filter(Boolean) // 分割路径并过滤掉空字符串
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${originalUrl}
    Method: ${req.method}
    IP: ${ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(pathParams)}
    Query: ${JSON.stringify(queryParams)}
    Body: ${JSON.stringify(
      body,
    )} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `
    if (code >= 500)
      this.logger.error(logFormat)
    else if (code >= 400)
      this.logger.warn(logFormat)
    else
      this.logger.info(logFormat)
  }
}

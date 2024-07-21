import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Observable, map } from 'rxjs'
import { Logger } from 'winston'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    let request = ctx.getRequest()
    return next.handle().pipe(
      map((data) => {
        const logFormat = ` 
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          Request original url: ${request.originalUrl}
          Method: ${request.method}
          IP: ${request.ip}
          Query:${JSON.stringify(request.query)}
          Body:${JSON.stringify(request.body)}
          User: ${JSON.stringify(request.user)}
          Response data:\n ${JSON.stringify(data)}
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
        this.logger.info(logFormat)
        request = null
        return {
          data,
          code: 200,
          message: '请求成功',
        }
      }),
    )
  }
}

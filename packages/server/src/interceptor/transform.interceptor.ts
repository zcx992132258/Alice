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
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { req } = context.getArgByIndex(1)

    return next.handle().pipe(
      map((data) => {
        const logFormat = ` 
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          Request original url: ${req.originalUrl}
          Method: ${req.method}
          IP: ${req.ip}
          User: ${JSON.stringify(req.user)}
          Response data:\n ${JSON.stringify(data)}
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
        this.logger.info(logFormat)
        return {
          data,
          code: 200,
          message: '请求成功',
        }
      }),
    )
  }
}

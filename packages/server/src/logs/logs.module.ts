import { join } from 'node:path'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Global, Module } from '@nestjs/common'
import * as winston from 'winston'
import {
  WinstonModule,
  WinstonModuleOptions,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston'
import 'winston-daily-rotate-file'

function createDailyRotateTransport(level: string, filename: string) {
  return new winston.transports.DailyRotateFile({
    // 如果是warn时，只记录warn级别之后的日志。warn, error
    level,
    dirname: join(__dirname, `../../logs/${level}`),
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    // 要保留的最大日志数。
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.prettyPrint(),
      winston.format.printf((info) => { // 定义文件输出内容
        return `时间:${info.timestamp},日志类型:${level},${info?.context ? `运行背景: ${info.context}` : ''},日志信息: ${info.message}`
      }),
    ),
  })
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // 控制台输出格式化
        const consoleTransport = new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        })

        return {
          transports: [
            consoleTransport,
            ...(configService.get('LOG_ON')
              ? [
                  // 使用函数创建transport，防止无论啥条件都创建logs文件
                  createDailyRotateTransport('info', 'info'),
                  createDailyRotateTransport('warn', 'warn'),
                ]
              : []),
          ],
        } as WinstonModuleOptions
      },
    }),
  ],
})
export class LogsModule {}

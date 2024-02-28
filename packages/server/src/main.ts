import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston'

import { AppModule } from './app.module'
import { LoggerMiddleware } from './middleware/logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(3000)
}

bootstrap()

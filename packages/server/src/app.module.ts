import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { mySqlTypeOrmModuleConfig } from './database'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { envConfig } from './config'
import { JwtAuthGuard } from './guards/JwtAuth.guard'
import { RedisModule } from './database/redis/redis.module'
import { LogsModule } from './logs/logs.module'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { HttpExceptionFilter } from './filter/http-exception.filter'
import { AllExceptionsFilter } from './filter/any-exception.filter'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [() => { return { LOG_ON: true } }],
  }), LogsModule, RedisModule, TypeOrmModule.forRoot(mySqlTypeOrmModuleConfig), JwtModule.register({
    global: true,
    secret: envConfig.JWTSECRET,
    signOptions: {
      expiresIn: '30d',
    },
  }), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  }, {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  }],
})
export class AppModule {}

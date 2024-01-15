import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { mySqlTypeOrmModuleConfig } from './database'
import { UserModule } from './modules/user/user.module'
import { envConfig } from './config'
import { TokenGuard } from './guards/token.guard'

@Module({
  imports: [TypeOrmModule.forRoot(mySqlTypeOrmModuleConfig), JwtModule.register({
    global: true,
    secret: envConfig.JWTSECRET,
    signOptions: {
      expiresIn: '30d',
    },
  }), UserModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: TokenGuard }],
})
export class AppModule {}

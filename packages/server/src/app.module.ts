import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { mySqlTypeOrmModuleConfig } from './database'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { envConfig } from './config'
import { JwtAuthGuard } from './guards/JwtAuth.guard'

@Module({
  imports: [TypeOrmModule.forRoot(mySqlTypeOrmModuleConfig), JwtModule.register({
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
  }],
})
export class AppModule {}

import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { envConfig } from '@alice/server/config'
import { User } from './alice/user.entity'

export const mySqlTypeOrmModuleConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: envConfig.MYSQL_DB_HOST,
  port: Number(envConfig.MYSQL_DB_PORT),
  username: envConfig.MYSQL_DB_USER,
  password: envConfig.MYSQL_DB_PASSWD,
  database: envConfig.MYSQL_DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User],
  poolSize: 10,
  connectorPackage: 'mysql2',
}

import process from 'node:process'
import dotenv from 'dotenv'

export const envConfig = dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.development.local' : '.env' }).parsed

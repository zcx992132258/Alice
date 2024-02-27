import process from 'node:process'
import * as path from 'node:path'
import dotenv from 'dotenv'

const ENV_FILE = path.join(__dirname, '..', process.env.NODE_ENV === 'development' ? '.env.development.local' : '.env')

export const envConfig = dotenv.config({ path: ENV_FILE }).parsed

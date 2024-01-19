import process from 'node:process'
import dotenv from 'dotenv'

// Load environment variables from .env file
export const envConfig = dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env' }).parsed

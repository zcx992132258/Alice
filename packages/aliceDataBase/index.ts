import { PrismaClient } from '@prisma/client'

export const AliceClient = {
  client: new PrismaClient(),
  name: 'AliceClient',
}

import { Prisma, PrismaClient } from '@prisma/client'

export const AliceClient = {
  client: new PrismaClient(),
  name: 'AliceClient',
}
export type UserField = Prisma.userFieldRefs

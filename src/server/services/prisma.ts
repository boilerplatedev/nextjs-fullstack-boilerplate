import { PrismaClient } from '@prisma/client'
import { CamelCasePlugin, Kysely, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler } from 'kysely'
import kyselyExtension from 'prisma-extension-kysely'

import { env } from '@/env'

import { type DB } from '../../../prisma/generated/types'

// Correctly type Extended Prisma Client: https://echobind.com/post/extending-types-for-prisma-extensions-in-nextjs
const extendPrismaClient = () =>
  new PrismaClient({
    log: env().NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  }).$extends(
    kyselyExtension({
      kysely: (driver) =>
        new Kysely<DB>({
          dialect: {
            createDriver: () => driver,
            createAdapter: () => new PostgresAdapter(),
            createIntrospector: (db) => new PostgresIntrospector(db),
            createQueryCompiler: () => new PostgresQueryCompiler(),
          },
          plugins: [new CamelCasePlugin()],
          log: env().NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
        }),
    }),
  )

export type PrismaType = ReturnType<typeof extendPrismaClient>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaType | undefined
}

export const prisma = globalForPrisma.prisma ?? extendPrismaClient()

if (env().NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Next Auth
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters'
// Prisma
import { db } from '@/app/_lib/prisma'

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRECT as string,
    }),
  ],
})

export { handler as GET, handler as POST }

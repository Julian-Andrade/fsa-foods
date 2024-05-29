// Next Auth
import NextAuth from 'next-auth'
// Libs
import { authOptions } from '@/app/_lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

'use client'

// React
import { ReactNode } from 'react'
// Next Auth
import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider

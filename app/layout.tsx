import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// Contexts
import CartProvider from './_context/cart'
// Providers
import AuthProvider from './_providers/auth'
// Components
import { Toaster } from './_components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FSA Food',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

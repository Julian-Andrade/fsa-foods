import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// Contexts
import CartProvider from './_context/cart'

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
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}

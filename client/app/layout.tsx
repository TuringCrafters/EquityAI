import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '../utils/provider'
import { Toaster } from "@/components/ui/toaster"
import NavBar from '@/components/navbar/NavBar'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Equity Ai',
  description: 'Equity Ai',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        {children}
        <Toaster/>
      </body>
    </html>
    </Providers>
  )
}
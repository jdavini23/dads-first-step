import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/common/Header'
import { FirebaseProvider } from '@/components/providers/FirebaseProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Dad's First Step",
  description: 'Your companion in the journey of fatherhood',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseProvider>
          <Header />
          {children}
        </FirebaseProvider>
      </body>
    </html>
  )
}

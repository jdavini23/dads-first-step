import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { RootProvider } from '@/components/providers/RootProvider'

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
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900 antialiased`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RootProvider>
            {children}
          </RootProvider>
        </div>
      </body>
    </html>
  )
}

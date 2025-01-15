import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Milestones | Dad\'s First Step',
  description: 'Track and celebrate your baby\'s important milestones',
}

export default function MilestonesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}

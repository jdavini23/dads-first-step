import { useEffect, useState } from 'react'

export default function EnvTestPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Log environment variables on mount
    console.log('Environment Variables Test Page:', {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Firebase Configuration:</h2>
          <div className="bg-gray-100 p-4 rounded space-y-2">
            <div>
              <strong>API Key:</strong> {process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'Not set'}
            </div>
            <div>
              <strong>Auth Domain:</strong> {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'Not set'}
            </div>
            <div>
              <strong>Project ID:</strong> {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not set'}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Environment:</h2>
          <div className="bg-gray-100 p-4 rounded space-y-2">
            <div>
              <strong>NODE_ENV:</strong> {process.env.NODE_ENV || 'Not set'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

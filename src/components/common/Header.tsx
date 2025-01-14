'use client'

import Link from 'next/link'
import { SignInButton } from '@/components/auth/SignInButton'
import { useAuthStore } from '@/stores/authStore'
import { firebaseService } from '@/lib/firebaseApp'
import { FirebaseError } from 'firebase/app'

export const Header = () => {
  const { user, reset } = useAuthStore()

  const handleSignOut = async () => {
    try {
      const { auth } = firebaseService
      await auth.signOut()
      reset()
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred'
      
      if (error instanceof FirebaseError) {
        errorMessage = error.message
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Dad&apos;s First Step
        </Link>
        
        <nav className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {user.photoURL && (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full"
                />
              )}
              <span className="text-gray-800">{user.displayName}</span>
              <button 
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <SignInButton />
          )}
        </nav>
      </div>
    </header>
  )
}

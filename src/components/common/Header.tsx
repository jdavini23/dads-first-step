'use client'

import { SignInButton } from '../auth/SignInButton'
import { useAuthStore } from '@/stores/authStore'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'

export const Header = () => {
  const user = useAuthStore((state) => state.user)
  const reset = useAuthStore((state) => state.reset)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      reset()
    } catch (error) {
      console.error('Sign out error', error)
    }
  }

  return (
    <header className="w-full py-4 px-6 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dad&apos;s First Step</h1>
        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.displayName}</span>
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

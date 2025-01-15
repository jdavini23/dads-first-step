'use client'

import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { FaGoogle } from 'react-icons/fa'
import { firebaseService } from '@/lib/firebaseApp'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

export const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useAuthStore((state) => state.setUser)
  const router = useRouter()

  const signInWithGoogle = async () => {
    setIsLoading(true)
    
    try {
      const { auth } = firebaseService
      const provider = new GoogleAuthProvider()
      
      const result = await signInWithPopup(auth, provider)
      
      if (!result.user) {
        throw new Error('No user found')
      }

      setUser({
        uid: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || '',
        photoURL: result.user.photoURL || ''
      })

      router.push('/')
    } catch (error: unknown) {
      console.error('Sign in error:', error)
      
      let errorMessage = 'An unknown error occurred'
      
      if (error instanceof FirebaseError) {
        errorMessage = error.message
        
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in popup was closed. Please try again.'
            break
          case 'auth/popup-blocked':
            errorMessage = 'Sign-in popup was blocked. Please allow popups and try again.'
            break
          default:
            break
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button 
      onClick={signInWithGoogle} 
      disabled={isLoading}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
    >
      {isLoading ? 'Signing in...' : <><FaGoogle className="h-4 w-4" /> <span>Sign in with Google</span></>}
    </button>
  )
}

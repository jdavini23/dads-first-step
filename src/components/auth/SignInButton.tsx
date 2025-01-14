'use client'

import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, AuthError } from 'firebase/auth'
import { auth } from '../../../firebase'
import { useAuthStore } from '@/stores/authStore'

export const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useAuthStore((state) => state.setUser)
  const setError = useAuthStore((state) => state.setError)

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
    } catch (error) {
      let errorMessage = 'An unknown error occurred'
      
      if (error instanceof AuthError) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in popup was closed before completing'
            break
          case 'auth/cancelled-popup-request':
            errorMessage = 'Sign-in request was cancelled'
            break
          case 'auth/popup-blocked':
            errorMessage = 'Popup was blocked by the browser'
            break
          case 'auth/operation-not-allowed':
            errorMessage = 'Google sign-in is not enabled'
            break
          default:
            errorMessage = error.message
        }
      }

      console.error('Sign in error', error)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={signInWithGoogle}
      disabled={isLoading}
      className={`
        ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}
        text-white font-bold py-2 px-4 rounded flex items-center justify-center
      `}
    >
      {isLoading ? (
        <span>Signing in...</span>
      ) : (
        'Sign in with Google'
      )}
    </button>
  )
}

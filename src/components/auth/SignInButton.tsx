'use client'

import { useState } from 'react'
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  AuthError as FirebaseAuthError 
} from 'firebase/auth'
import { auth, googleProvider } from '../../../../firebase'
import { useAuthStore } from '@/stores/authStore'

export const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useAuthStore((state) => state.setUser)
  const setError = useAuthStore((state) => state.setError)

  const signInWithGoogle = async () => {
    setIsLoading(true)
    setError(null) // Clear any previous errors

    try {
      // Configure provider to always show account selection
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      })

      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred'
      
      // Type guard to check if error is a FirebaseAuthError
      const isFirebaseAuthError = (err: unknown): err is FirebaseAuthError => {
        return (
          typeof err === 'object' && 
          err !== null && 
          'code' in err && 
          'message' in err
        )
      }

      if (isFirebaseAuthError(error)) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in was cancelled. Please try again.'
            break
          case 'auth/cancelled-popup-request':
            errorMessage = 'Sign-in request was cancelled'
            break
          case 'auth/popup-blocked':
            errorMessage = 'Popup was blocked by the browser. Please enable popups.'
            break
          case 'auth/operation-not-allowed':
            errorMessage = 'Google sign-in is not enabled for this application'
            break
          case 'auth/invalid-credential':
            errorMessage = 'Invalid credentials. Please try again.'
            break
          default:
            errorMessage = error.message
        }
      } else if (error instanceof Error) {
        // Fallback for other Error types
        errorMessage = error.message
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
        <div className="flex items-center">
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Signing in...</span>
        </div>
      ) : (
        'Sign in with Google'
      )}
    </button>
  )
}

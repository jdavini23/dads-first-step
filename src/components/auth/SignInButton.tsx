'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  signInWithRedirect, 
  GoogleAuthProvider,
  getRedirectResult,
  AuthErrorCodes,
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { firebaseService } from '@/lib/firebaseApp'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

export const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useAuthStore((state) => state.setUser)
  const setError = useAuthStore((state) => state.setError)
  const router = useRouter()

  // Comprehensive error logging function
  const logAuthenticationError = (error: unknown, context: string) => {
    console.group('🔐 Authentication Error')
    console.log('Context:', context)
    
    if (error instanceof FirebaseError) {
      console.log('Firebase Error Code:', error.code)
      console.log('Firebase Error Message:', error.message)
      console.log('Firebase Error Details:', {
        email: error.customData?.email,
        credential: error.customData?.credential
      })
    } else if (error instanceof Error) {
      console.log('Standard Error:', error.message)
      console.log('Error Name:', error.name)
    } else {
      console.log('Unknown Error Type:', error)
    }

    // Attempt to log environment and configuration details
    console.log('Environment:', {
      nodeEnv: process.env.NODE_ENV,
      firebaseConfig: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        apiKeyPresent: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY
      }
    })

    console.groupEnd()
  }

  // Robust redirect result handler
  const handleRedirectResult = useCallback(async () => {
    try {
      const auth = getAuth()
      console.log('Attempting to get redirect result with current auth instance...')
      
      // Set local persistence to improve redirect handling
      await setPersistence(auth, browserLocalPersistence)
      
      const result = await getRedirectResult(auth)
      
      if (result) {
        console.log('Redirect result received:', result.user)
        const user = result.user
        
        // Validate user object
        if (!user || !user.uid) {
          console.warn('Invalid user object received')
          setError('Authentication failed: Invalid user object')
          return
        }

        // Set user in global state
        setUser({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Anonymous',
          photoURL: user.photoURL || '',
        })

        // Redirect to milestones page
        router.push('/milestones')
      } else {
        console.log('No redirect result found')
      }
    } catch (error: unknown) {
      logAuthenticationError(error, 'Redirect Result Handling')
      
      // More specific error handling
      if (error instanceof FirebaseError) {
        let errorMessage = 'Authentication failed'
        switch (error.code) {
          case 'auth/operation-not-allowed':
            errorMessage = 'Google sign-in is not enabled for this project.'
            break
          case 'auth/unauthorized-domain':
            errorMessage = 'This domain is not authorized for sign-in. Check Firebase Console settings.'
            break
          case 'auth/invalid-credential':
            errorMessage = 'Invalid credentials. Please try again.'
            break
          case 'auth/user-disabled':
            errorMessage = 'This user account has been disabled.'
            break
          default:
            errorMessage = error.message || 'An unexpected error occurred during authentication'
        }
        
        setError(errorMessage)
      } else if (error instanceof Error) {
        setError(error.message || 'An unexpected error occurred')
      } else {
        setError('An unknown authentication error occurred')
      }
    }
  }, [setUser, router, setError])

  // Handle redirect result on component mount and periodically
  useEffect(() => {
    handleRedirectResult()

    // Set up a periodic check to handle delayed redirect results
    const intervalId = setInterval(handleRedirectResult, 5000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [handleRedirectResult])

  const signInWithGoogle = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      const { auth } = firebaseService
      const provider = new GoogleAuthProvider()
      
      // Configure provider scopes and parameters
      provider.addScope('profile')
      provider.addScope('email')
      provider.addScope('openid')
      
      // Set custom parameters for sign-in
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      console.group('🚀 Initiating Google Sign-In')
      console.log('Current Environment:', process.env.NODE_ENV)
      console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
      console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
      console.groupEnd()

      // Set persistence before redirect
      await setPersistence(auth, browserLocalPersistence)

      // Initiate sign-in redirect
      await signInWithRedirect(auth, provider)
    } catch (error: unknown) {
      logAuthenticationError(error, 'Sign-In Redirect')
      
      if (error instanceof FirebaseError) {
        let errorMessage = 'Sign-in failed'
        switch (error.code) {
          case AuthErrorCodes.POPUP_CLOSED_BY_USER:
            errorMessage = 'Sign-in was cancelled.'
            break
          case AuthErrorCodes.POPUP_BLOCKED:
            errorMessage = 'Popup was blocked. Please enable popups.'
            break
          default:
            errorMessage = error.message || 'An unexpected error occurred'
        }
        
        setError(errorMessage)
      } else if (error instanceof Error) {
        setError(error.message || 'Sign-in failed')
      } else {
        setError('An unknown error occurred during sign-in')
      }
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
        text-white font-bold py-2 px-4 rounded flex items-center justify-center min-w-[200px]
      `}
    >
      {isLoading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  )
}

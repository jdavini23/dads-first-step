'use client'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../../firebase'
import { useAuthStore } from '@/stores/authStore'

export const SignInButton = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const setError = useAuthStore((state) => state.setError)

  const signInWithGoogle = async () => {
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
      console.error('Sign in error', error)
      setError(error instanceof Error ? error.message : 'Failed to sign in')
    }
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign in with Google
    </button>
  )
}

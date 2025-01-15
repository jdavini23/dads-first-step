'use client'

import { ReactNode, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseService } from '@/lib/firebaseApp'
import { useAuthStore } from '@/stores/authStore'

type FirebaseProviderProps = {
  children: ReactNode
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const { setUser, clearUser } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseService.auth,
      (user) => {
        if (user) {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          })
        } else {
          clearUser()
        }
      },
      (error) => {
        console.error('Auth state change error:', error)
        clearUser()
      }
    )

    return () => unsubscribe()
  }, [setUser, clearUser])

  return <>{children}</>
}

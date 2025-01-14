import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface AuthState {
  user: User | null
  error: string | null
  setUser: (user: User) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState: AuthState = {
  user: null,
  error: null,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUser: (user: User) => {
        console.log('Setting user in auth store:', user)
        
        // Log current state before update
        const currentUser = get().user
        console.log('Current user before update:', currentUser)

        // Perform the update
        set({ 
          user, 
          error: null 
        })

        // Log state after update
        console.log('User set in auth store. New state:', get().user)
      },
      setError: (error: string | null) => {
        // Ensure error is not null or empty
        if (error === null || error === '') {
          console.warn('Attempted to set empty or null error')
          return
        }

        console.error('Auth store error:', error)
        set({ error })
      },
      reset: () => {
        console.log('Resetting auth store')
        set(initialState)
      },
    }),
    {
      name: 'auth-storage',
      // Optional: Add more detailed logging for persistence
      onRehydrateStorage: (state) => {
        console.log('Rehydrating auth store:', state)
      }
    }
  )
)

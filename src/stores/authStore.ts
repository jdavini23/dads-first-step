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
    (set) => ({
      ...initialState,
      setUser: (user: User) => set({ user, error: null }),
      setError: (error: string | null) => set({ error }),
      reset: () => set(initialState),
    }),
    {
      name: 'auth-storage',
    }
  )
)

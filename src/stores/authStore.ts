import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { auth } from '../../firebase'
import type { AuthState, User } from '../types/auth'

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUser: (user: User | null) => set({ user, loading: false }),
        setError: (error: string | null) => set({ error }),
        setLoading: (loading: boolean) => set({ loading }),
        reset: () => set(initialState),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
)

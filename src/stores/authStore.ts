import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  initialized: boolean;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      error: null,
      isAuthenticated: false,
      accessToken: null,
      initialized: false,
      setUser: (user: User | null) => {
        if (user) {
          set({
            user,
            isAuthenticated: true,
            loading: false,
            error: null,
            initialized: true,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            initialized: true,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        initialized: state.initialized,
      }),
    }
  )
);

export { useAuthStore };

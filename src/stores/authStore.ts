import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';

export interface AuthState {
  _user: User | null;
  loading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      _user: null,
      loading: true,
      error: null,
      isAuthenticated: false,
      initialized: false,
      setUser: (user: User | null) => {
        if (user) {
          set({
            _user: user,
            isAuthenticated: true,
            loading: false,
            error: null,
            initialized: true,
          });
        } else {
          set({
            _user: null,
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
        isAuthenticated: state.isAuthenticated,
        initialized: state.initialized,
      }),
    }
  )
);

export { useAuthStore };

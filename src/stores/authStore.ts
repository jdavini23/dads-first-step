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
  setInitialized: () => void;
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
        set({
          _user: user,
          isAuthenticated: !!user,
          loading: false,
          error: null,
          initialized: true,
        });
      },
      setInitialized: () => {
        set((state) => ({
          ...state,
          loading: false,
          initialized: true,
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        _user: state._user,
        isAuthenticated: state.isAuthenticated,
        initialized: state.initialized,
      }),
    }
  )
);

export { useAuthStore };

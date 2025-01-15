import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        try {
          // Migration strategy to handle different versions of persisted state
          if (!persistedState || version === 0) {
            // If no version or old version, reset to initial state
            return { user: null };
          }
          
          // Validate persisted state structure
          if (persistedState.user) {
            const { uid, email, displayName, photoURL } = persistedState.user;
            if (uid && typeof uid === 'string') {
              return persistedState;
            }
          }
          
          // If validation fails, reset
          return { user: null };
        } catch (error) {
          console.error('Migration error:', error);
          return { user: null };
        }
      },
      onRehydrateStorage: () => (state) => {
        if (!state || !state.user) {
          state?.clearUser();
        }
      },
      storage: localStorage,
    }
  )
);

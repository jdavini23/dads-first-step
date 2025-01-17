import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface User {
  id?: string;
  name?: string;
  email?: string;
}

interface UserState {
  _user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  immer((set) => ({
    _user: null,
    setUser: (user) =>
      set((state) => {
        state._user = user;
      }),
    clearUser: () =>
      set((state) => {
        state._user = null;
      }),
  }))
);

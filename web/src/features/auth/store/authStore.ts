import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/auth.types';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: null,
      login: (token: string) => set({ token, isAuthenticated: true }),
      logout: () => set({ token: null, isAuthenticated: false, user: null }),
      setUser: (user: User) => set({ user }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    }
  )
);

import { create } from "zustand";
import { User } from "@/store/user.types";

interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;

  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user: User) => set({ user, error: null }),

  updateUser: (updates: Partial<User>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  clearUser: () => set({ user: null, error: null }),

  setLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),
}));

export default useUserStore;

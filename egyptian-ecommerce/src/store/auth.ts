"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  label: string;
  governorate: string;
  city: string;
  address: string;
  building?: string;
  floor?: string;
  apartment?: string;
}

interface AuthUser {
  name: string;
  email: string;
  phone: string;
}

interface AuthState {
  user: AuthUser | null;
  addresses: Address[];
  login: (user: AuthUser) => void;
  logout: () => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      addresses: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      addAddress: (address) =>
        set({ addresses: [...get().addresses, { ...address, id: `addr-${Date.now()}` }] }),
      removeAddress: (id) => set({ addresses: get().addresses.filter((a) => a.id !== id) }),
    }),
    { name: "neel-auth" }
  )
);

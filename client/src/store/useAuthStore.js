import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {
    role: "ADMIN",   // change to COMMANDER / LOGISTICS to test
    base_id: 1
  },

  setUser: (user) => set({ user })
}));

export default useAuthStore;
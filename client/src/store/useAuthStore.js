import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {
    role: "COMMANDER",   // change to COMMANDER / LOGISTICS to test
    base_id: 1
  },

  setUser: (user) => set({ user })
}));

export default useAuthStore;
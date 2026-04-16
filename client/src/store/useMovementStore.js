// src/store/useMovementStore.js
import { create } from "zustand";
import { createMovement, getMovements } from "../api/movement.api";

const useMovementStore = create((set) => ({
  movements: [],

  fetchMovements: async () => {
    const res = await getMovements();
    set({ movements: res.data });
  },

  addMovement: async (data) => {
    await createMovement(data);
  },
}));

export default useMovementStore;
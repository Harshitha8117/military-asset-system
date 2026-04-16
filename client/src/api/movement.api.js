// src/api/movement.api.js
import api from "./axios";

export const createMovement = (data) =>
  api.post("/movements", data);

export const getMovements = (params) =>
  api.get("/movements", { params });
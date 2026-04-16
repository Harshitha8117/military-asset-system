import axios from "axios";

const API = "https://military-asset-system-1-tgsw.onrender.com/api";

export const fetchDashboard = () => {
  return axios.get(`${API}/dashboard`);
};
// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard/Dashboard";
import PurchasesPage from "../features/purchases/PurchasesPage";
import TransfersPage from "../features/transfers/TransfersPage";
import AssignmentsPage from "../features/assignments/AssignmentsPage";

export default function AppRoutes() {
  return (

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/transfers" element={<TransfersPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
      </Routes>
  );
}
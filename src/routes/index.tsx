// src/routes/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";  
import TambahData from "../pages/TambahData";
import TransaksiKAD from "../pages/TransaksiKAD";
import Distribusi from "../pages/Distribusi";
import Produksi from "../pages/Produksi";
import EarlyWarning from "../pages/EarlyWarning";
import Notifications from "../pages/Notifications";
import WeeklyPrice from "../pages/WeeklyPrice";
import InputPrice from "../pages/InputPrice";
import ProtectedRoute from "./ProtectedRoute"; 

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/import"
        element={
          <ProtectedRoute>
            <TambahData />
          </ProtectedRoute>
        }
      />
      <Route
        path="/produksi"
        element={
          <ProtectedRoute>
            <Produksi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/early-warning"
        element={
          <ProtectedRoute>
            <EarlyWarning />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/price"
        element={
          <ProtectedRoute>
            <WeeklyPrice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/input-price"
        element={
          <ProtectedRoute>
            <InputPrice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kerja-sama/jual-beli"
        element={
          <ProtectedRoute>
            <TransaksiKAD />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kerja-sama/distribusi"
        element={
          <ProtectedRoute>
            <Distribusi />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

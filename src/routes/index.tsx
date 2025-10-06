import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";  
import TambahData from "../pages/TambahData";
import TransaksiKAD from "../pages/TransaksiKAD";
import Distribusi from "../pages/Distribusi";
import Produksi from "../pages/Produksi";
import EarlyWarning from "../pages/EarlyWarning";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/import" element={<TambahData />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produksi" element={<Produksi />} />
      <Route path="/early-warning" element={<EarlyWarning />} />
      <Route path="/kerja-sama/jual-beli" element={<TransaksiKAD />} />
      <Route path="/kerja-sama/distribusi" element={<Distribusi />} />
    </Routes>
  );
}
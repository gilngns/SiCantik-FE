import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";  
import TambahData from "../pages/TambahData";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/import" element={<TambahData />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
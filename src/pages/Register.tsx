import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import AuthLayout from "../components/layout/AuthLayout";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register data:", form);
  };

  return (
    <AuthLayout>
      {/* 🔹 max-w berubah sesuai device, padding fleksibel */}
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4 sm:px-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Nama Lengkap */}
          <Input
            label="Nama Lengkap"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* No Telepon */}
          <Input
            label="No Telepon"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

         {/* Role */}
        <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
        </label>
        <div className="relative">
            <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#47BC6E] focus:border-[#47BC6E]"
            >
            <option value="" className="text-gray-600">--Pilih Role--</option>
            <option value="petani">Petani</option>
            <option value="distributor">Distributor</option>
            </select>
        </div>
        </div>


          {/* Kota */}
          <Input
            label="Kota"
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
          />

          {/* Alamat (full width) */}
          <div className="sm:col-span-2">
            <Input
              label="Alamat"
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <Input
            label="Masukkan Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Konfirmasi Password */}
          <Input
            label="Ketik Ulang Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Button (full width) */}
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>

          {/* Link ke Login (full width, center) */}
          <div className="sm:col-span-2">
            <p className="text-sm text-center text-gray-500">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-[#47BC6E] font-medium hover:underline">
                Masuk disini
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  address: string;
  password: string;
  confirmPassword: string;
};

interface RegisterFormProps {
  form: FormValues;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RegisterForm({
  form,
  handleChange,
  handleSubmit,
}: RegisterFormProps) {
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Nama & Email */}
      <Input
        label="Nama Lengkap"
        type="text"
        name="name"
        placeholder="Masukan Nama Lengkap"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Masukan Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      {/* Telepon & Role */}
      <Input
        label="No Telepon"
        type="tel"
        name="phone"
        placeholder="Contoh: 083456789"
        value={form.phone}
        onChange={handleChange}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#47BC6E]"
        >
          <option value="">--Pilih Role--</option>
          <option value="petani">Petani</option>
          <option value="distributor">Distributor</option>
        </select>
      </div>

      {/* Kota */}
      <div className="md:col-span-2">
        <Input
          label="Kota"
          type="text"
          name="city"
          placeholder="Masukan Kota"
          value={form.city}
          onChange={handleChange}
        />
      </div>

      {/* Alamat (jadi input biasa biar compact) */}
      <div className="md:col-span-2">
        <Input
          label="Alamat"
          type="text"
          name="address"
          placeholder="Masukan Alamat Lengkap"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      {/* Password & Confirm */}
      <Input
        label="Masukan Password Anda"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <Input
        label="Ketik Ulang Password Anda"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />

      {/* Button */}
      <div className="md:col-span-2">
        <Button type="submit" className="w-full py-3">
          Register
        </Button>
      </div>

      {/* Link */}
      <div className="md:col-span-2 mb-6">
        <p className="text-sm text-center text-gray-500">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-[#47BC6E] font-medium hover:underline"
          >
            Masuk disini
          </Link>
        </p>
      </div>
    </form>
  );
}

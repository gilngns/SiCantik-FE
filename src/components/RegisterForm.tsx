import { useEffect, useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { getRoles, type Role } from "../services/roleService";
import {
  getProvinces,
  getRegencies,
  getDistricts,
  type WilayahItem,
} from "../services/wilayahService";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  role: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  address: string;
  password: string;
  confirmPassword: string;
};

interface RegisterFormProps {
  form: FormValues;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFieldValue: (name: keyof FormValues, value: string) => void; // ✅ props baru
  loading?: boolean;
}

export default function RegisterForm({
  form,
  handleChange,
  handleSubmit,
  setFieldValue,
  loading,
}: RegisterFormProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const [provinces, setProvinces] = useState<WilayahItem[]>([]);
  const [regencies, setRegencies] = useState<WilayahItem[]>([]);
  const [districts, setDistricts] = useState<WilayahItem[]>([]);

  const [selectedProvCode, setSelectedProvCode] = useState<string>("");
  const [selectedRegencyCode, setSelectedRegencyCode] = useState<string>("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>("");

  // roles
  useEffect(() => {
    getRoles()
      .then((d) => setRoles(Array.isArray(d) ? d : []))
      .catch((e) => console.error("Failed to fetch roles:", e))
      .finally(() => setLoadingRoles(false));
  }, []);

  // provinces
  useEffect(() => {
    getProvinces().then(setProvinces);
  }, []);

  // regencies saat provinsi berubah
  useEffect(() => {
    if (!selectedProvCode) {
      setRegencies([]);
      setDistricts([]);
      setSelectedRegencyCode("");
      setSelectedDistrictCode("");
      return;
    }
    getRegencies(selectedProvCode).then(setRegencies);
    setDistricts([]);
    setSelectedRegencyCode("");
    setSelectedDistrictCode("");
  }, [selectedProvCode]);

  // districts saat regency berubah
  useEffect(() => {
    if (!selectedRegencyCode) {
      setDistricts([]);
      setSelectedDistrictCode("");
      return;
    }
    getDistricts(selectedRegencyCode).then(setDistricts);
    setSelectedDistrictCode("");
  }, [selectedRegencyCode]);

  // handlers
  const handleSelectProvinsi = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedProvCode(code);

    const item = provinces.find((p) => String(p.code) === String(code));

    if (item) {
      setFieldValue("provinsi", item.name);
    }
    setFieldValue("kota", "");
    setFieldValue("kecamatan", "");
  };

  const handleSelectKota = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedRegencyCode(code);

    const item = regencies.find((r) => String(r.code) === String(code));

    if (item) {
      setFieldValue("kota", item.name);
    }
    setFieldValue("kecamatan", "");
  };

  const handleSelectKecamatan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedDistrictCode(code);

    const item = districts.find((d) => String(d.code) === String(code));

    if (item) {
      setFieldValue("kecamatan", item.name);
    }
  };

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

      {/* Telp & Role */}
      <Input
        label="No Telepon"
        type="tel"
        name="phone"
        placeholder="Contoh: 083456789"
        value={form.phone}
        onChange={handleChange}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#47BC6E]"
          required
        >
          <option value="" disabled>--Pilih Role--</option>
          {loadingRoles ? (
            <option disabled>Loading...</option>
          ) : roles.length ? (
            roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>
                {role.nama_role}
              </option>
            ))
          ) : (
            <option disabled>Tidak ada role</option>
          )}
        </select>
      </div>

      {/* Provinsi & Kota */}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
          <select
            value={selectedProvCode}
            onChange={handleSelectProvinsi}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#47BC6E]"
            required
          >
            <option value="" disabled>--Pilih Provinsi--</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kota / Kabupaten</label>
          <select
            value={selectedRegencyCode}
            onChange={handleSelectKota}
            disabled={!selectedProvCode}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#47BC6E] disabled:bg-gray-100"
            required
          >
            <option value="" disabled>--Pilih Kota/Kabupaten--</option>
            {regencies.map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kecamatan */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
        <select
          value={selectedDistrictCode}
          onChange={handleSelectKecamatan}
          disabled={!selectedRegencyCode}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#47BC6E] disabled:bg-gray-100"
          required
        >
          <option value="" disabled>--Pilih Kecamatan--</option>
          {districts.map((d) => (
            <option key={d.code} value={d.code}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Alamat */}
      <div className="md:col-span-2">
        <Input
          label="Alamat Lengkap"
          type="text"
          name="address"
          placeholder="Masukan Alamat Lengkap"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      {/* Password */}
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

      {/* Submit */}
      <div className="md:col-span-2">
        <Button type="submit" className="w-full py-3" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>
      </div>

      <div className="md:col-span-2 mb-6">
        <p className="text-sm text-center text-gray-500">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-[#47BC6E] font-medium hover:underline">
            Masuk disini
          </Link>
        </p>
      </div>
    </form>
  );
}

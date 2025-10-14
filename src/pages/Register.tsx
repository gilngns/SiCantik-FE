import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import RegisterForm from "../components/RegisterForm";
import { register as apiRegister } from "../services/authService";
import type { RegisterPayload } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

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

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    role: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setFieldValue = (name: keyof FormValues, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (form.password !== form.confirmPassword) {
      return setErr("Konfirmasi password tidak sama.");
    }

    const payload: RegisterPayload = {
      nama_lengkap: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirmPassword,
      nomor_telepon: form.phone || undefined,
      role_id: Number(form.role),
      provinsi: form.provinsi,
      kota: form.kota,
      kecamatan: form.kecamatan,
      alamat_lengkap: form.address || undefined,
    };

    setLoading(true);
    try {
      await apiRegister(payload);
      nav("/login");
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      console.error("Register error:", err.response?.data);

      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[Object.keys(err.response?.data?.errors || {})[0]]?.[0] ||
        "Registrasi gagal, coba lagi.";

      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Daftar Akun" formWidth="lg">
      {err && <div className="text-sm text-red-600 mb-3">{err}</div>}
      <RegisterForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setFieldValue={setFieldValue}   
        loading={loading}
      />
    </AuthLayout>
  );
}

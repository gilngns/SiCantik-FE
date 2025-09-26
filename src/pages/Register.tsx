import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import RegisterForm from "../components/RegisterForm";

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

export default function Register() {
  const [form, setForm] = useState<FormValues>({
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register data:", form);
  };

  return (
    <AuthLayout showLogo = {false} title="Daftar Akun" formWidth="lg">
      <RegisterForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </AuthLayout>
  );
}

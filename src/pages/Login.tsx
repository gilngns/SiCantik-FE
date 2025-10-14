import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/layout/AuthLayout";
import { login } from "../services/authService";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
  
    try {
      const res = await login({ email, password }); 
  
      const token = res?.data?.token || res?.data?.data?.token;
      if (token) {
        localStorage.setItem("access_token", token);
        nav("/dashboard"); 
      } else {
        setErr("Login berhasil tapi token tidak ditemukan.");
      }
    } catch (e: unknown) {
      if (e && typeof e === "object" && "response" in e) {
        const errObj = e as { response?: { data?: { message?: string } } };
        const msg =
          errObj.response?.data?.message || "Login gagal. Cek email/password.";
        setErr(msg);
      } else {
        setErr("Terjadi kesalahan tak terduga.");
      }
    } finally {
      setLoading(false);
    }
  };  

  return (
    <AuthLayout title="">
      <form onSubmit={handleSubmit} className="space-y-5 mt-8 md:mt-0">
        {err && <div className="text-sm text-red-600">{err}</div>}

        <Input
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-end text-sm">
          <Link to="/forgot-password" className="text-[#47BC6E] hover:text-emerald-700">
            Lupa password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Memproses..." : "Login"}
        </Button>

        <p className="text-sm text-center text-gray-500">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#47BC6E] font-medium hover:text-emerald-700">
            Daftar Disini
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
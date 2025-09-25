import { useState } from "react";
import { Link } from "react-router-dom"; 
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import AuthLayout from "../components/layout/AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Lupa Password */}
          <div className="flex justify-end text-sm">
            <a href="#" className="text-[#47BC6E] hover:underline">
              Lupa password?
            </a>
          </div>

          {/* Button */}
          <Button type="submit">Masuk</Button>

          {/* Register */}
          <p className="text-sm text-center text-gray-500">
            Belum punya akun?{" "}
            <Link
              to="/register" // ✅ arahkan ke route register
              className="text-[#47BC6E] font-medium hover:underline"
            >
              Daftar Disini
            </Link>
          </p>
        </form>
      </Card>
    </AuthLayout>
  );
}

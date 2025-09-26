import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/layout/AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <AuthLayout showLogo title="">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 mt-8 md:mt-0"
      >
        {/* Email / No Telp */}
        <Input
          label="Email"
          type="text"
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
          <Link
            to="/forgot-password"
            className="text-[#47BC6E] no-underline hover:text-emerald-700 focus:no-underline"
          >
            Lupa password?
          </Link>
        </div>

        {/* Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>

        {/* Register */}
        <p className="text-sm text-center text-gray-500">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-[#47BC6E] font-medium no-underline hover:text-emerald-700 focus:no-underline"
          >
            Daftar Disini
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

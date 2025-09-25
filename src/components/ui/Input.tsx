import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export default function Input({ label, type = "text", className = "", ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-800">{label}</label>
      <div className="relative">
      <input
        type={isPassword && showPassword ? "text" : type}
        className={`w-full rounded-lg px-3 py-2 text-sm
            border border-[#CBD5E1] 
            focus:outline-none focus:ring-1 focus:ring-[#1A9D8C] 
            hover:border-[#1A9D8C]
            ${className}`}
        {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

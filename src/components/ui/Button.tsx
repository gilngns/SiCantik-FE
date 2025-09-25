import type { ButtonHTMLAttributes } from "react";
import React from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
  className={`w-full py-3 rounded-lg 
    bg-[#1A9D8C] hover:bg-[#178b7d] 
    text-white font-semibold text-sm transition 
    ${className}`}
  {...props}
>
  {children}
</button>
  );
}

import { useState, useRef, useEffect } from "react";
import { ChevronDown, UserCircle } from "lucide-react";

interface UserMenuProps {
  name: string;
  avatar?: string; // opsional: foto profil
}

export default function UserMenu({ name, avatar }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Klik di luar → otomatis tutup dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white shadow px-4 py-2 rounded-full cursor-pointer transition hover:bg-gray-100"
      >
        {/* Foto Profil atau Icon */}
        {avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <UserCircle size={28} className="text-gray-500" />
        )}

        {/* Nama */}
        <span className="font-semibold text-gray-700">{name}</span>

        {/* Icon Dropdown */}
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Profil Saya
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Pengaturan
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

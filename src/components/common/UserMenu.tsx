import { useState, useRef, useEffect } from "react";
import { ChevronDown, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout as apiLogout } from "../../services/authService"; 

interface UserMenuProps {
  name: string;
  avatar?: string;
}

export default function UserMenu({ name, avatar }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); 
  const nav = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await apiLogout(); 
    } catch {
      // ignore: we'll clear token anyway
    } finally {
      localStorage.removeItem("access_token");
      setOpen(false);
      setBusy(false);
      nav("/login", { replace: true });
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-white shadow px-4 py-2 rounded-full transition hover:bg-gray-100"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {avatar ? (
          <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <UserCircle size={28} className="text-gray-500" />
        )}
        <span className="font-semibold text-gray-700">{name}</span>
        <ChevronDown size={16} className={`text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => nav("/profile")}>
            Profil Saya
          </button>
          <button
            onClick={handleLogout}
            disabled={busy}
            className={`w-full text-left px-4 py-2 text-sm rounded ${busy ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:bg-red-100"}`}
          >
            {busy ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}

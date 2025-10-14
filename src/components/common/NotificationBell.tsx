import { useState, useRef, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Link } from "react-router-dom";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  date: string;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  const notifications: NotificationItem[] = [
    {
      id: 1,
      title: "Peringatan Harga",
      message: "Harga bulan agustus minggu ke-2 adalah 53.168\nAmbang Batas : Rp45.000",
      date: "29 Sep 2025, 10:45",
    },
    {
      id: 2,
      title: "Target Produksi",
      message: "4 dari 42 Kecamatan belum memenuhi target produksi",
      date: "29 Sep 2025, 10:45",
    },
  ];

  const toggleOpen = () => {
    setOpen(!open);
    if (!open) setUnread(false);
  };

  // Tutup notif kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      {/* 🔔 Desktop: buka modal */}
      <button
        onClick={toggleOpen}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition hidden lg:block"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unread && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></span>
        )}
      </button>

      {/* 🔔 Mobile: link ke /notifications */}
      <Link
        to="/notifications"
        className="relative p-2 rounded-lg hover:bg-gray-100 transition block lg:hidden"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unread && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></span>
        )}
      </Link>

      {/* Panel notifikasi → hanya desktop */}
      <div
        className={`absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-xl transform transition-all duration-300 origin-top-right z-50 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-3">
          <h3 className="font-semibold text-gray-800">Notification</h3>
          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto">
          {notifications.map((notif) => {
            const [mainMsg, threshold] = notif.message.split("\n");
            return (
              <div
                key={notif.id}
                className="flex gap-3 px-5 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold">
                  !
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-800">{notif.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{mainMsg}</p>
                  {threshold && (
                    <p className="text-xs font-semibold text-gray-800">{threshold}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-3">{notif.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

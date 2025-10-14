import { useMemo } from "react";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  date: string;
}

export default function Notifications() {
  const notifications: NotificationItem[] = useMemo(
    () => [
      {
        id: 1,
        title: "Fluktuasi Harga",
        message: "Harga bulan agustus minggu ke-2 adalah 53.168",
        date: "29 Sep 2025, 10:45",
      },
      {
        id: 2,
        title: "Target Produksi",
        message: "4 dari 42 Kecamatan belum memenuhi target produksi",
        date: "29 Sep 2025, 10:45",
      },
      {
        id: 3,
        title: "Kerja Sama Antar Daerah",
        message: "2 Transaksi masuk",
        date: "29 Sep 2025, 10:45",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ Header Hijau */}
      <div
        className="relative bg-[#145C52] text-white px-6 pt-8 pb-6"
        style={{
          backgroundImage: "url('/bg-mobile-db.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-xl font-bold">Notifikasi</h1>
      </div>

      {/* ✅ Daftar Notifikasi */}
      <div className="flex-1 divide-y divide-gray-200 bg-white">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-4 flex gap-3 items-start"
          >
            {/* Icon Bulat Hitam */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold">
              !
            </div>

            {/* Isi Notifikasi */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{notif.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
              <p className="text-xs text-gray-400 mt-2">{notif.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

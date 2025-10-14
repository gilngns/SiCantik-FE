import DashboardLayout from "../components/layout/DashboardLayout";
import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function EarlyWarning() {
  const wilayah = [
    { nama: "Pamulihan", target: 31, realisasi: 60 },
    { nama: "Bayongbong", target: 63, realisasi: 60 },
    { nama: "Leles", target: 43, realisasi: 60 },
    { nama: "Cikajang", target: 23, realisasi: 60 },
  ];

  const priceData = useMemo(
    () => [
      { bulan: "M1", Produsen: 24500, Konsumen: 31500 },
      { bulan: "M2", Produsen: 25200, Konsumen: 32200 },
      { bulan: "M3", Produsen: 25550, Konsumen: 33100 },
      { bulan: "M4", Produsen: 26100, Konsumen: 34500 },
      { bulan: "M5", Produsen: 26800, Konsumen: 35200 },
      { bulan: "M6", Produsen: 27350, Konsumen: 36100 },
      { bulan: "M7", Produsen: 28100, Konsumen: 37200 },
      { bulan: "M8", Produsen: 27600, Konsumen: 39500 },
    ],
    []
  );

  // 🔔 Tambahan state & handler untuk modal notif
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleBellClick = () => {
    const isMobile = window.innerWidth < 1024; 
    if (isMobile) {
      navigate("/notifications"); 
    } else {
      setOpen(!open); 
    }
  };

  // ✅ Tutup modal kalau klik di luar
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

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <DashboardLayout title="Early Warning System">
      <div className="flex flex-col gap-6">
        {/* ✅ MOBILE HEADER */}
        <div
          className="lg:hidden sticky top-0 z-50 text-white w-full pt-10 pb-4 px-4"
          style={{
            backgroundImage: "url('/bg-mobile-ews.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-between items-start" ref={panelRef}>
            <h1 className="text-lg font-semibold">Early Warning System</h1>

            <button
              onClick={handleBellClick}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-2 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.311 6.022c1.733.64 3.56 1.086 5.454 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            {/* Modal Notifikasi (hanya desktop) */}
            <div
              className={`absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl transition-all duration-300 ${
                open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="px-5 py-3 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Notification</h3>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>
              <div className="p-5 text-sm text-gray-600">
                <p>Contoh notifikasi: Harga minggu ke-2 Agustus Rp 53.168</p>
                <p className="mt-2 text-xs text-gray-400">29 Sep 2025, 10:45</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ MOBILE VIEW */}
        <div className="flex flex-col gap-6 px-4 lg:hidden">
          {/* Daftar Wilayah */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Daftar Wilayah</h3>
            <div className="grid grid-cols-3 text-sm font-semibold text-gray-600 border-b pb-2">
              <span>Wilayah</span>
              <span className="text-right">Target</span>
              <span className="text-right">Realisasi</span>
            </div>
            <div className="mt-2 space-y-2">
              {wilayah.map((w) => (
                <div
                  key={w.nama}
                  className="grid grid-cols-3 text-sm text-gray-700"
                >
                  <span>{w.nama}</span>
                  <span className="text-right">{w.target}</span>
                  <span className="text-right">{w.realisasi}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Capaian Produksi */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Capaian Produksi
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-red-800">4</span>
              <span className="text-gray-600 text-sm">Dari 42 Kecamatan</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              Belum mencapai target <span className="font-bold">produksi</span>
            </p>
            <p className="text-red-800 text-sm font-semibold">
              -16.25% dari Target Produksi Dinas
            </p>
          </div>

          {/* Peta Produksi */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 text-center">
              Peta Produksi di Bawah Target
            </h3>
            <p className="text-xs text-gray-400 text-center mt-1">
              Terakhir update: 1 Agustus 2025
            </p>
            <div className="mt-4 h-[260px] rounded-xl bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                Map Placeholder (GeoJSON belum ada)
              </span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-8 bg-gray-400 rounded" />
                <span className="text-gray-600">Mencapai Target</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-8 bg-red-500 rounded" />
                <span className="text-gray-600">Belum Mencapai Target</span>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ DESKTOP VIEW */}
        <div className="hidden lg:grid grid-cols-12 gap-6">
          {/* Peta */}
          <div className="col-span-8 bg-white rounded-xl shadow-sm p-5">
            <div className="text-center">
              <h3 className="font-semibold text-gray-800">
                Peta Produksi di Bawah Target
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Terakhir update: 1 Agustus 2025
              </p>
            </div>
            <div className="mt-4 h-[360px] rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
              <span className="text-gray-500">Map Placeholder</span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-10 bg-gray-400" />
                <span className="text-gray-600">Mencapai Target</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-10 bg-red-500" />
                <span className="text-gray-600">Belum Mencapai Target</span>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Capaian Produksi */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Capaian Produksi
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-red-800">4</span>
                <span className="text-gray-600">Dari 42 Kecamatan</span>
              </div>
              <p className="text-gray-600 mt-1">
                Belum mencapai target <span className="font-bold">produksi</span>
              </p>
            </div>

            {/* Daftar Wilayah */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Daftar Wilayah
              </h4>
              <div className="grid grid-cols-3 text-sm font-semibold text-gray-600 border-b pb-2">
                <span>Wilayah</span>
                <span className="text-right">Target</span>
                <span className="text-right">Realisasi</span>
              </div>
              <div className="mt-2 space-y-2">
                {wilayah.map((w) => (
                  <div
                    key={w.nama}
                    className="grid grid-cols-3 text-sm text-gray-700"
                  >
                    <span>{w.nama}</span>
                    <span className="text-right">{w.target}</span>
                    <span className="text-right">{w.realisasi}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Chart Fluktuasi Harga (desktop & mobile) */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800">Fluktuasi Harga</h3>
            <p className="text-xs text-gray-400">Terakhir update: 1 Agustus 2025</p>
          </div>
          <div className="mt-4 h-[260px] md:h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis
                  width={70}
                  tickFormatter={(v) => v.toLocaleString("id-ID")}
                />
                <Tooltip
                  formatter={(v: number) => `Rp ${v.toLocaleString("id-ID")}`}
                  labelFormatter={(l) => `Bulan: ${l}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Produsen"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Konsumen"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">Rp/kg</div>
        </div>
      </div>
    </DashboardLayout>
  );
}

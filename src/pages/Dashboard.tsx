import DashboardLayout from "../components/layout/DashboardLayout";
// import ProductionMap from "../components/charts/ProductionMap";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [wilayah, setWilayah] = useState("");
  const [tahun, setTahun] = useState("");

  // 🔔 State & handler untuk notifikasi
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleBellClick = () => {
    const isMobile = window.innerWidth < 1024; // breakpoint lg
    if (isMobile) {
      navigate("/notifications"); // redirect ke halaman notif di mobile
    } else {
      setOpen(!open); // buka modal notif di desktop
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
    <DashboardLayout title="Dashboard">
      <div className="p-0 md:p-6 flex flex-col gap-6">
        {/* ✅ Header versi mobile pakai background image full width */}
        <div
          className="md:hidden relative text-white w-full pt-8 pb-16 px-4"
          style={{
            backgroundImage: "url('/bg-mobile-db.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Greeting */}
          <div className="flex justify-between items-start" ref={panelRef}>
            <div>
              <p className="text-xl font-bold mb-1">Halo, Selamat Datang</p>
              <p className="text-xs text-gray-200">Rabu 24, Mei 2023</p>
            </div>

            {/* Ikon Notifikasi */}
            <button
              onClick={handleBellClick}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-2 relative"
            >
              <Icon icon="mdi:bell-outline" className="w-6 h-6 text-white" />
            </button>

            {/* Modal Notifikasi → hanya muncul di desktop */}
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
                <p>Contoh notifikasi: 2 transaksi kerja sama masuk</p>
                <p className="mt-2 text-xs text-gray-400">29 Sep 2025, 10:45</p>
              </div>
            </div>
          </div>

          {/* Card Wilayah */}
          <div className="mt-6 bg-white p-4 rounded-xl shadow">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wilayah
            </label>
            <select
              value={wilayah}
              onChange={(e) => setWilayah(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#145C52]"
            >
              <option>Pilih Wilayah</option>
              <option>Ciwidey</option>
              <option>Rancabali</option>
              <option>Pasir Jambu</option>
            </select>
          </div>

          {/* Card Periode Tahun */}
          <div className="mt-4 bg-white p-4 rounded-xl shadow">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Periode Tahun
            </label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#145C52]"
            >
              <option>Pilih Periode Tahun</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>

          {/* ✅ Lengkungan putih full timpa background hijau */}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="bg-white rounded-t-3xl h-10 w-full"></div>
          </div>
        </div>

        {/* ✅ Header versi desktop */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm font-medium">
              Berdasarkan rentang waktu:
            </span>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#145C52]">
                <option>Januari 2025 - September 2025</option>
                <option>Oktober 2025 - Desember 2025</option>
              </select>
              <Icon
                icon="fluent:chevron-down-20-regular"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
          <button className="bg-[#1A9D8C] hover:bg-[#0D3C34] text-white px-4 py-2 rounded-md font-medium">
            Tambah Data
          </button>
        </div>

        {/* ✅ Cards hasil produksi - hanya muncul di desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 px-4 md:px-0 mt-4 md:mt-0">
          {/* Banyak */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <Icon icon="fluent:person-feedback-16-filled" width="20" height="20" />
              </div>
              <h3 className="text-base font-semibold text-gray-700">
                Hasil Produksi Banyak
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>

          {/* Sedang */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <Icon icon="icon-park-solid:buy" width="20" height="20" />
              </div>
              <h3 className="text-base font-semibold text-gray-700">
                Hasil Produksi Sedang
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">30</p>
          </div>

          {/* Sedikit */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <Icon icon="fluent:person-feedback-16-filled" width="20" height="20" />
              </div>
              <h3 className="text-base font-semibold text-gray-700">
                Hasil Produksi Sedikit
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">4</p>
          </div>
        </div>

        {/* ✅ Peta Persebaran - sementara hidden di kode contoh */}
        {/* <div className="bg-white rounded-xl shadow-sm p-4 mx-4 md:mx-0">
          <h3 className="font-semibold text-gray-800">Persebaran Hasil Produksi</h3>
          <p className="text-xs text-gray-400">Terakhir update: 1 Agustus 2025</p>
          <div className="mt-3">
            <ProductionMap />
          </div>
        </div> */}
      </div>
    </DashboardLayout>
  );
}

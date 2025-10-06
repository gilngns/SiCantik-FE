import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ChevronDown } from "lucide-react";

export default function Produksi() {
  const [wilayah, setWilayah] = useState("Semua Kecamatan");
  const [rentang, setRentang] = useState("Januari 2025 - Agustus 2025");
  const [komoditas, setKomoditas] = useState("Semua Komoditas");

  return (
    <DashboardLayout title="Produksi">
      <div className="flex flex-col gap-6">

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Wilayah */}
          <div className="flex items-center gap-2 relative">
            <label className="text-sm text-gray-400">Wilayah:</label>
            <div className="relative">
              <select
                value={wilayah}
                onChange={(e) => setWilayah(e.target.value)}
                className="border border-gray-400 text-gray-500 rounded-md px-3 pr-8 py-2 text-sm focus:outline-none appearance-none"
              >
                <option>Semua Kecamatan</option>
                <option>Kecamatan A</option>
                <option>Kecamatan B</option>
              </select>
              {/* Chevron custom pakai icon */}
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Rentang Waktu */}
          <div className="flex items-center gap-2 relative">
            <label className="text-sm text-gray-400">Rentang waktu:</label>
            <div className="relative">
              <select
                value={rentang}
                onChange={(e) => setRentang(e.target.value)}
                className="border border-gray-400 text-gray-500 rounded-md px-3 pr-8 py-2 text-sm focus:outline-none appearance-none"
              >
                <option>Januari 2025 - Agustus 2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Komoditas */}
          <div className="flex items-center gap-2 relative">
            <label className="text-sm text-gray-400">Komoditas:</label>
            <div className="relative">
              <select
                value={komoditas}
                onChange={(e) => setKomoditas(e.target.value)}
                className="border border-gray-400 text-gray-500 rounded-md px-3 pr-8 py-2 text-sm focus:outline-none appearance-none"
              >
                <option>Semua Komoditas</option>
                <option>Beras</option>
                <option>Jagung</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Placeholder untuk Map */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center h-[400px]">
          <span className="text-gray-500">Map Placeholder (GEOJSON belum ada)</span>
        </div>

        {/* Keterangan */}
        <div className="text-sm text-gray-400 mt-2">
          Terakhir update: 1 Agustus 2025
        </div>
      </div>
    </DashboardLayout>
  );
}

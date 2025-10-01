import DashboardLayout from "../components/layout/DashboardLayout";
import ProductionMap from "../components/charts/ProductionMap"; // ⬅️ tambahkan ini
import { Icon } from "@iconify/react";

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="p-6">
        {/* Header Dashboard */}
        <div className="flex items-center justify-between mb-6">
          {/* Kiri: Label + Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm font-medium">
              Berdasarkan rentang waktu:
            </span>

            {/* Custom Select */}
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

          {/* Kanan: Tombol Tambah Data */}
          <button className="bg-[#1A9D8C] hover:bg-[#0D3C34] text-white px-4 py-2 rounded-md font-medium">
            Tambah Data
          </button>
        </div>

        {/* Cards Hasil Produksi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Banyak */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <Icon icon="fluent:person-feedback-16-filled" width="20" height="20" />
              </div>
              <h3 className="text-base font-semibold text-gray-700">Hasil Produksi Banyak</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>

          {/* Sedang */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <Icon icon="icon-park-solid:buy" width="20" height="20" />
              </div>
              <h3 className="text-base font-semibold text-gray-700">Hasil Produksi Sedang</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">30</p>
          </div>

          {/* Sedikit */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <Icon icon="fluent:person-feedback-16-filled" width="20" height="20" />
              </div>
              <h3 className="text-base font-semibold text-gray-700">Hasil Produksi Sedikit</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">4</p>
          </div>
        </div>

        {/* Peta Persebaran Hasil Produksi */}
        <ProductionMap />  {/* ⬅️ render komponen peta di sini */}
      </div>
    </DashboardLayout>
  );
}

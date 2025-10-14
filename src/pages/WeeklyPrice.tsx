import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/layout/BottomNav";

export default function WeeklyPrice() {
  const navigate = useNavigate();
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Dummy data harga
  const priceData = useMemo(
    () => [
      { minggu: "M1", Produsen: 24500, Konsumen: 31500 },
      { minggu: "M2", Produsen: 25200, Konsumen: 32200 },
      { minggu: "M3", Produsen: 25550, Konsumen: 33100 },
      { minggu: "M4", Produsen: 26100, Konsumen: 34500 },
      { minggu: "M5", Produsen: 26800, Konsumen: 35200 },
      { minggu: "M6", Produsen: 27350, Konsumen: 36100 },
      { minggu: "M7", Produsen: 28100, Konsumen: 37200 },
      { minggu: "M8", Produsen: 27600, Konsumen: 39500 },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:hidden">
      {/* ✅ Header Hijau */}
      <div
        className="sticky top-0 z-50 bg-[#145C52] text-white px-6 pt-7 pb-6 flex justify-between items-center"
        style={{
          backgroundImage: "url('/bg-mobile-ews.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-lg font-semibold">Perkembangan Harga Mingguan</h1>

        {/* 🔔 Lonceng */}
        <button
          onClick={() => navigate("/notifications")}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-2"
        >
          <Icon icon="mdi:bell-outline" className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* ✅ Filter */}
      <div className="px-4 py-6 bg-white">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Filter Perkembangan Harga Mingguan
        </h2>

        {/* Input Tanggal */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Masukan Tanggal
          </label>
          <div
            className="relative cursor-pointer"
            onClick={() => setShowDateModal(true)}
          >
            <input
              type="text"
              value={selectedDate}
              placeholder="Masukan Tanggal Inputan Harga Pasar"
              className="w-full border border-gray-400 rounded-lg px-3 py-2 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#145C52]"
              readOnly
            />
            <Icon
              icon="mdi:calendar-outline"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-7 h-7"
            />
          </div>
        </div>

        {/* Dropdown Komoditas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Komoditas
          </label>
          <div className="relative">
            <select
              defaultValue=""
              className="w-full border border-gray-400 rounded-lg px-3 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#145C52] appearance-none"
            >
              <option value="" disabled>
                Pilih Komoditas
              </option>
              <option>Bawang Merah</option>
              <option>Beras</option>
              <option>Kopi</option>
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-7 h-7 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ✅ Chart */}
      <div className="flex-1 px-4 py-6">
        <h3 className="font-semibold text-gray-800">
          Perkembangan Rerata Harga Mingguan
        </h3>
        <p className="text-xs text-gray-400">Terakhir update: 1 Agustus 2025</p>

        <div className="mt-4 h-[280px] bg-white rounded-lg shadow-sm p-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={priceData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="minggu" />
              <YAxis tickFormatter={(v) => v.toLocaleString("id-ID")} />
              <Tooltip
                formatter={(v: number) => `Rp ${v.toLocaleString("id-ID")}`}
                labelFormatter={(l) => `Minggu: ${l}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Konsumen"
                stroke="#f97316"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Produsen"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">Rp/kg</p>
      </div>

      {/* ✅ Floating Action Button */}
    <button
    onClick={() => navigate("/input-price")}
    className="fixed bottom-20 right-6 bg-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
    >
    <Icon icon="mdi:plus" className="w-12 h-12 text-[#1A9D8C]" />
    </button>


      {/* ✅ Bottom Navigation */}
      <BottomNav />

      {/* ✅ Modal Tanggal */}
    {showDateModal && (
    <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
        <div
        className="bg-white rounded-xl shadow-xl p-6 w-80 transform transition-all duration-300 scale-100 opacity-100"
        >
        <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
            Pilih Tanggal
        </h3>

        <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#145C52]"
            onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
            <button
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={() => setShowDateModal(false)}
            >
            Batal
            </button>
            <button
            className="px-4 py-2 rounded-md bg-[#145C52] text-white hover:bg-[#0e3e37] transition"
            onClick={() => setShowDateModal(false)}
            >
            Simpan
            </button>
        </div>
        </div>
    </div>
    )}
    </div>
  );
}

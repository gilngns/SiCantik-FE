import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom"; // ⬅️ Import navigate
import BottomNav from "../components/layout/BottomNav";

export default function InputPrice() {
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate(); // ⬅️ Init navigate

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:hidden">
      {/* ✅ Header */}
      <div
        className="sticky top-0 z-50 bg-[#145C52] text-white px-6 pt-7 pb-6 flex justify-between items-center"
        style={{
          backgroundImage: "url('/bg-mobile-db.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-lg font-semibold">Input Harga Produsen</h1>
        
        {/* 🔔 Lonceng -> Redirect ke /notifications */}
        <button
          onClick={() => navigate("/notifications")}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-2"
        >
          <Icon icon="mdi:bell-outline" className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* ✅ Form */}
      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Komoditas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Komoditas
          </label>
          <div className="relative">
            <select
              defaultValue=""
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-gray-700 
              focus:outline-none focus:ring-2 focus:ring-[#145C52] appearance-none"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none"
            />
          </div>
        </div>

        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Masukan Tanggal
          </label>
          <div
            className="relative cursor-pointer"
            onClick={() => setShowDateModal(true)}
          >
            <input
              type="text"
              value={selectedDate || "Masukan Tanggal Hari Pengecekan"}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm 
              text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#145C52]"
            />
            <Icon
              icon="mdi:calendar-outline"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none"
            />
          </div>
        </div>

        {/* Harga Produsen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Masukan Harga Produsen
          </label>
          <div className="flex">
            <input
              type="number"
              placeholder="0"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm text-gray-700 
              focus:outline-none focus:ring-2 focus:ring-[#145C52]"
            />
            <span className="px-4 py-2 border border-l-0 border-gray-300 bg-gray-100 rounded-r-lg text-sm text-gray-600">
              Rp
            </span>
          </div>
        </div>

        {/* Tombol Submit */}
        <button className="w-full bg-[#145C52] text-white py-3 rounded-lg font-semibold shadow hover:bg-[#0e3e37] transition">
          Simpan Harga Produsen
        </button>
      </div>

      {/* ✅ Modal Pilih Tanggal */}
      {showDateModal && (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 transform transition-all duration-300 scale-100 opacity-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
              Pilih Tanggal
            </h3>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
              focus:outline-none focus:ring-2 focus:ring-[#145C52]"
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

      {/* ✅ Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

import { useState } from "react";
import { MapPin, User, CircleCheckBig, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TransaksiCardProps {
  perusahaan: string;
  komoditas: string;
  jumlah: string;
  harga: string;
  total: string;
  alamat: string;
}

export default function TransaksiCard({
  perusahaan,
  komoditas,
  jumlah,
  harga,
  total,
  alamat,
}: TransaksiCardProps) {
  const [showModal, setShowModal] = useState<"accept" | "reject" | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-5">
        {/* Nama Perusahaan */}
        <div className="flex items-center gap-2 mb-3">
          <User className="w-5 h-5 text-gray-900" />
          <h3 className="font-semibold text-gray-800">{perusahaan}</h3>
        </div>

        {/* Baris Utama */}
        <div className="flex items-start justify-between">
          {/* Info Transaksi */}
          <div className="flex flex-1 justify-between text-sm text-gray-700 pr-6">
            <p>
              Komoditas: <span className="font-semibold">{komoditas}</span>
            </p>
            <p>
              Jumlah Pembelian: <span className="font-semibold">{jumlah}</span>
            </p>
            <p>
              Harga Penawaran: <span className="font-semibold">{harga}</span>
            </p>
            <div className="flex items-start gap-1 max-w-xs">
              <MapPin className="w-4 h-4 text-gray-500 mt-1 shrink-0" />
              <span>{alamat}</span>
            </div>
          </div>

          {/* Tombol */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowModal("accept")}
              className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
            >
              <CircleCheckBig className="w-4 h-4" /> Terima
            </button>
            <button
              onClick={() => setShowModal("reject")}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" /> Tolak
            </button>
          </div>
        </div>

        {/* Total Nilai */}
        <p className="text-sm font-semibold mt-3">
          Total Nilai: <span className="text-green-600">{total}</span>
        </p>
      </div>

      {/* Modal Validasi */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-xl shadow-xl p-6 w-96 text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {/* Tombol Close */}
              <button
                onClick={() => setShowModal(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon Bulat */}
              <div
                className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  showModal === "accept"
                    ? "border-2 border-yellow-400 text-yellow-500"
                    : "border-2 border-red-400 text-red-500"
                }`}
              >
                {showModal === "accept" ? (
                  <span className="font-bold text-xl">!</span>
                ) : (
                  <span className="font-bold text-xl">×</span>
                )}
              </div>

              {/* Pesan */}
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                {showModal === "accept"
                  ? "Yakin Menerima Kerjasama?"
                  : "Yakin Menolak Kerjasama?"}
              </h2>

              {/* Tombol Aksi */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowModal(null);
                    alert(
                      showModal === "accept"
                        ? "Transaksi diterima ✅"
                        : "Transaksi ditolak ❌"
                    );
                  }}
                  className={`px-6 py-2 rounded-full text-white font-medium w-full ${
                    showModal === "accept"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {showModal === "accept" ? "Terima" : "Tolak"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

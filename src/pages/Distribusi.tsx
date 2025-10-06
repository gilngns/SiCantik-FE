import { useState } from "react";
import { MapPin, User, CircleCheckBig, Clock } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";

interface Distribusi {
  perusahaan: string;
  komoditas: string;
  jumlah: string;
  harga: string;
  total: string;
  alamat: string;
  diterima?: string;
  tanggal?: string;
  status: "diterima" | "menunggu" | "selesai" | "tidak sesuai";
}

const dataDistribusi: Distribusi[] = [
  {
    perusahaan: "PT. Jaya Baru",
    komoditas: "Bawang Merah",
    jumlah: "100 ton",
    harga: "Rp. 44.000",
    total: "Rp. 4.400.000.000",
    alamat: "Jl. Ibrahim Adjie No 16, Desa Wangunjaya, Kota Bandung",
    diterima: "100 ton",
    tanggal: "12/10/2025",
    status: "diterima",
  },
  {
    perusahaan: "PT. Sumbersari",
    komoditas: "Bawang Merah",
    jumlah: "50 ton",
    harga: "Rp. 42.000",
    total: "Rp. 2.100.000.000",
    alamat: "Jl. Sindang Barang Pengkolan No.416, Kota Bogor",
    status: "menunggu",
  },
];

export default function DistribusiPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");

  const filtered = dataDistribusi.filter((d) => {
    const matchSearch = d.perusahaan.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "semua" ? true : d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout title="Distribusi">
      {/* Filter */}
      <div className="space-y-4 mb-6">
        {/* Baris 1: Input + Dropdown */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Cari Distribusi"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-2 w-100 text-gray-400"
          />
          <select className="border rounded-md px-3 py-2 w-100 text-gray-400">
            <option>Semua Komoditas</option>
            <option>Bawang Merah</option>
            <option>Bawang Putih</option>
          </select>
        </div>

        {/* Baris 2: Label Status + Button */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-sm text-gray-800">Status</span>
          <div className="flex gap-2 flex-wrap">
            {["semua", "menunggu", "selesai", "tidak sesuai"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-md text-sm border ${
                  statusFilter === st
                    ? "bg-[#093731] text-white border-[#093731]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {st === "semua"
                  ? "Semua"
                  : st === "menunggu"
                  ? "Dalam perjalanan"
                  : st === "selesai"
                  ? "Selesai"
                  : "Tidak Sesuai"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List Distribusi */}
      <div className="space-y-4">
        {filtered.map((d, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-5">
            {/* Nama Perusahaan */}
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-gray-900" />
              <h3 className="font-semibold text-gray-800">{d.perusahaan}</h3>
            </div>

            {/* Detail Distribusi */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-700">
              {/* Kolom 1 */}
              <div className="space-y-6">
                <p>
                  Komoditas: <span className="font-semibold">{d.komoditas}</span>
                </p>
                {d.diterima && (
                  <p>
                    Jumlah Diterima: <span className="font-semibold">{d.diterima}</span>
                  </p>
                )}
                <p>
                  Total Nilai: <span className="font-semibold text-green-600">{d.total}</span>
                </p>
              </div>

              {/* Kolom 2 */}
              <div className="space-y-6">
                <p>
                  Jumlah Pembelian: <span className="font-semibold">{d.jumlah}</span>
                </p>
                {d.tanggal && (
                  <p>
                    Tanggal Terkirim: <span className="font-semibold">{d.tanggal}</span>
                  </p>
                )}
              </div>

              {/* Kolom 3 */}
              <div>
                <p>
                  Harga Per kilogram: <span className="font-semibold">{d.harga}</span>
                </p>
              </div>

              {/* Kolom 4 */}
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-start gap-2 text-xs flex-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 mt-0.5 shrink-0" />
                  <span>{d.alamat}</span>
                </div>

                {/* Aksi */}
                <div className="flex flex-col gap-2">
                  {d.status === "diterima" && (
                    <>
                      <button className="px-2.5 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center justify-center gap-1 text-xs whitespace-nowrap">
                        <CircleCheckBig size={12} /> Terima
                      </button>
                      <button className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center gap-1 text-xs whitespace-nowrap">
                        Tolak
                      </button>
                    </>
                  )}
                  {d.status === "menunggu" && (
                    <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium flex items-center justify-center gap-1 whitespace-nowrap">
                      <Clock size={12} /> Menunggu
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

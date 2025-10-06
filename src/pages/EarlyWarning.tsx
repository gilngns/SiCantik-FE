import DashboardLayout from "../components/layout/DashboardLayout";
import { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export default function EarlyWarning() {
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

  const wilayah = [
    { nama: "Pamulihan", target: 30, realisasi: 60 },
    { nama: "Cikajang", target: 80, realisasi: 75 },
    { nama: "Cibatu", target: 150, realisasi: 80 },
    { nama: "Cisurupan", target: 100, realisasi: 90 },
  ];

  return (
    <DashboardLayout title="Early Warning System">
      <div className="flex flex-col gap-6">
        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Peta (placeholder) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5">
              <div className="text-center">
                <h3 className="font-semibold text-slate-800">Peta Produksi di Bawah Target</h3>
                <p className="text-xs text-slate-400 mt-1">Terakhir update: 1 Agustus 2025</p>
              </div>
              <div className="mt-4 h-[360px] rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                <span className="text-slate-500">Map Placeholder (GeoJSON belum ada)</span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-10 bg-slate-400" />
                  <span className="text-slate-600">Mencapai Target</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-10 bg-red-500" />
                  <span className="text-slate-600">Belum Mencapai Target</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Capaian Produksi — mirip screenshot */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5">
            {/* Judul */}
            <h4 className="text-lg font-semibold text-[#1E2B3C] mb-2">
                Capaian Produksi
            </h4>

            {/* Angka + teks */}
            <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-red-800">4</span>
                <span className="text-gray-600 text-[15px]">Dari 42 Kecamatan</span>
            </div>

            {/* Baris kedua */}
            <p className="text-gray-600 text-[15px] mt-1">
                Belum mencapai target <span className="font-bold text-gray-500">produksi</span>
            </p>
            </div>


            {/* Daftar Wilayah — header & rows boxed */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5">
              <h4 className="text-[18px] font-semibold text-slate-800 mb-3">Daftar Wilayah</h4>

              {/* Table header with subtle divider */}
              <div className="px-3">
                <div className="grid grid-cols-3 text-[13px] font-semibold text-slate-600">
                  <div>Wilayah</div>
                  <div className="text-right">Target</div>
                  <div className="text-right">Realisasi</div>
                </div>
                <div className="mt-2 h-px bg-slate-200" />
              </div>

              {/* Rows (boxed, rounded, spacing) */}
              <div className="mt-3 space-y-2">
                {wilayah.map((w) => (
                  <div
                    key={w.nama}
                    className="mx-3 rounded-md bg-white px-3 py-2 grid grid-cols-3 text-[14px] text-slate-700"
                  >
                    <div>{w.nama}</div>
                    <div className="text-right">{w.target}</div>
                    <div className="text-right">{w.realisasi}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 — Chart */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5">
          <div className="text-center">
            <h3 className="font-semibold text-slate-800">Fluktuasi Harga</h3>
            <p className="text-xs text-slate-400">Terakhir update: 1 Agustus 2025</p>
          </div>
          <div className="mt-4 h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis width={70} tickFormatter={(v) => v.toLocaleString("id-ID")} />
                <Tooltip
                  formatter={(v: number) => `Rp ${v.toLocaleString("id-ID")}`}
                  labelFormatter={(l) => `Bulan: ${l}`}
                />
                <Legend />
                <Line type="monotone" dataKey="Produsen" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Konsumen" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-slate-500">Rp/kg</div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "../components/layout/DashboardLayout";
import TransaksiCard from "../components/ui/TransaksiCard";

export default function TransaksiKAD() {
  const transaksi = [
    {
      id: 1,
      perusahaan: "PT. Jaya Baru",
      komoditas: "Bawang Merah",
      jumlah: "100 ton",
      harga: "Rp. 44.000",
      total: "Rp. 4.400.000.000",
      alamat:
        "Jl. Ibrahim Adjie No 16, Desa Wangunjaya Kecamatan Kiara Condong, Kota Bandung, Jawa Barat.",
    },
    {
      id: 2,
      perusahaan: "PT. Tani Raya",
      komoditas: "Bawang Merah",
      jumlah: "5 ton",
      harga: "Rp. 44.000",
      total: "Rp. 4.400.000.000",
      alamat:
        "Jl. Ibrahim Adjie No 16, Desa Wangunjaya Kecamatan Kiara Condong, Kota Bandung, Jawa Barat.",
    },
  ];

  return (
    <DashboardLayout title="Transaksi KAD">
     <div className="bg-white shadow-md rounded-xl p-6">
    <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-bold text-gray-800">
        Daftar Pengajuan KAD
        </h2>
        <span className="bg-yellow-400 text-white text-xs font-medium px-3 py-1 rounded-full">
        Menunggu Konfirmasi
        </span>
    </div>

    <div className="space-y-4">
        {transaksi.map((item) => (
        <TransaksiCard key={item.id} {...item} />
        ))}
    </div>
    </div>
    </DashboardLayout>
  );
}

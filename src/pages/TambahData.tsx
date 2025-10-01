import DashboardLayout from "../components/layout/DashboardLayout";
import { FilePlus, FileText, X, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

export default function TambahData() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setIsUploading(true);

      // simulasi upload 2 detik
      setTimeout(() => {
        setIsUploading(false);
      }, 2000);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <DashboardLayout title="Tambah Data">
      <div className="bg-white shadow-md rounded-2xl p-8">
        {/* Komoditas */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Komoditas
          </label>
          <select className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>--Pilih Komoditas--</option>
          </select>
        </div>

        {/* Periode Tahun */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Periode Tahun
          </label>
          <select className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>--Pilih Periode Tahun--</option>
          </select>
        </div>

        {/* Periode Bulan */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Periode Bulan
          </label>
          <select className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>--Pilih Periode Bulan--</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Data Produksi
          </label>

          {!file ? (
            <div
              onClick={handleClick}
              className="relative border-dashed border-gray-400 border-[1px] rounded-lg px-6 py-12 text-center cursor-pointer hover:bg-gray-50 transition"
            >
              <FilePlus className="mx-auto mb-4 h-10 w-10 text-gray-400" />
              <p className="text-gray-500 text-sm">
                Masukan File Data Produksi, atau
              </p>
              <span className="text-blue-600 text-sm underline">
                klik untuk melihat
              </span>

              {/* Hidden Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".xlsx,.xls,.csv"
                hidden
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg">
              <div className="flex items-center gap-3">
                {isUploading ? (
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                ) : (
                  <FileText className="w-5 h-5 text-gray-600" />
                )}
                <span className="text-sm text-gray-700">{file.name}</span>
              </div>
              <button
                onClick={removeFile}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Info Support */}
          <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
            <span>Support file formats: .xlsx, .xls, .csv</span>
            <span>Max size: 10 MB</span>
          </div>
        </div>

        {/* Submit */}
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow w-full md:w-auto">
          Tambah Data
        </button>
      </div>
    </DashboardLayout>
  );
}

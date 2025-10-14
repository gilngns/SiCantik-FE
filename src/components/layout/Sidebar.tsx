import InfoCard from "../ui/InfoCard";
import SidebarItem from "../ui/SidebarItem";
import infocardIcon from "../../assets/infocard.png";
import { LayoutGrid, Sprout, Users, Plus, CircleAlert } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#093731] text-white flex flex-col font-inter font-semibold tracking-wide">
      {/* Header / Logo */}
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-white">SiCantik</h1>
        <p className="text-xs text-gray-300 mt-1">Sistem Tanam Dan Petik</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-5 px-2">
        <SidebarItem icon={Plus} label="Import" to="/import" />

        <SidebarItem icon={LayoutGrid} label="Dashboard" to="/dashboard" />

        <SidebarItem icon={Sprout} label="Produksi" to="/produksi" />

        <SidebarItem
          icon={CircleAlert}
          label="Early Warning System"
          to="/early-warning"
        />

        <SidebarItem
          icon={Users}
          label="Kerja Sama"
          children={[
            { label: "Jual & Beli", to: "/kerja-sama/jual-beli" },
            { label: "Distribusi", to: "/kerja-sama/distribusi" },
          ]}
        />
      </nav>

      {/* InfoCard */}
      <div className="p-4 mt-14">
        <InfoCard
          icon={infocardIcon}
          text="Tingkatkan produktivitas dan profitabilitas aktivitas agrikultur Anda bersama mitra petani."
        />
      </div>
    </aside>
  );
}

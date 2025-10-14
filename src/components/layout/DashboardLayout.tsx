import { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import UserMenu from "../common/UserMenu";
import Notification from "../common/NotificationBell";
import BottomNav from "../layout/BottomNav";
import { getProfile } from "../../services/profileService";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardLayout({ title, children }: DashboardLayoutProps) {
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    getProfile()
      .then((data) => setUserName(data.nama_lengkap))
      .catch(() => setUserName("Guest"));
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main */}
      <main className="flex-1 bg-gray-50 p-0 md:p-6 pb-20 md:pb-6">
        <div className="hidden md:flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

          <div className="flex items-center gap-4">
            <Notification />
            <UserMenu name={userName} />
          </div>
        </div>

        {children}
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}

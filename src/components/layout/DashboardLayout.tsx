import Sidebar from "../layout/Sidebar";
import UserMenu from "../common/UserMenu";
import Notification from "../common/NotificationBell";
import BottomNav from "../layout/BottomNav";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardLayout({ title, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar hanya muncul di desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-0 md:p-6 pb-20 md:pb-6">
        {/* ✅ Header hanya di desktop */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

          <div className="flex items-center gap-4">
            <Notification />
            <UserMenu name="Muhammad Ardi" />
          </div>
        </div>

        {children}
      </main>

      {/* ✅ Bottom Nav untuk mobile */}
      <BottomNav />
    </div>
  );
}

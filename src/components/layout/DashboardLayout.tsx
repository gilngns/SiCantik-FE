import Sidebar from "../layout/Sidebar";
import UserMenu from "../common/UserMenu";
import Notification from "../common/NotificationBell";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardLayout({ title, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

          <div className="flex items-center gap-4">
            {/* Notification */}
            <Notification />

            {/* User Menu */}
            <UserMenu name="Muhammad Ardi" />
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}

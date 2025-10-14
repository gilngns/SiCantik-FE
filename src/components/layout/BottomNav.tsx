import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-sm z-50 md:hidden">
      <div className="flex justify-around items-center py-2 text-xs">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-emerald-700 font-semibold" : "text-gray-400"
            }`
          }
        >
          <Icon icon="mdi:home" className="w-6 h-6" />
          <span>Dashboard</span>
        </NavLink>

        {/* EWS */}
        <NavLink
          to="/early-warning"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-emerald-700 font-semibold" : "text-gray-400"
            }`
          }
        >
          <Icon icon="mdi:alert-circle-outline" className="w-6 h-6" />
          <span>EWS</span>
        </NavLink>

        {/* Harga */}
        <NavLink
          to="/price"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-emerald-700 font-semibold" : "text-gray-400"
            }`
          }
        >
          <Icon icon="mdi:message-text-outline" className="w-6 h-6" />
          <span>Harga</span>
        </NavLink>

        {/* Kerja Sama */}
        <NavLink
          to="/kerja-sama"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-emerald-700 font-semibold" : "text-gray-400"
            }`
          }
        >
          <Icon icon="mdi:account-group-outline" className="w-6 h-6" />
          <span>Kerja Sama</span>
        </NavLink>

        {/* Profil */}
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-emerald-700 font-semibold" : "text-gray-400"
            }`
          }
        >
          <Icon icon="mdi:account-circle-outline" className="w-6 h-6" />
          <span>Profil</span>
        </NavLink>
      </div>
    </div>
  );
}
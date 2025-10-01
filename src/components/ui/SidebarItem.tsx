import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SidebarItemProps {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
  isCollapsed?: boolean;
}

export default function SidebarItem({
  icon: Icon,
  label,
  to,
  children,
  isCollapsed = false,
}: SidebarItemProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hasActiveChild =
    children?.some((c) => location.pathname.startsWith(c.to)) ?? false;

  // 🔽 Dropdown item
  if (children && children.length > 0) {
    return (
      <div className="font-inter font-semibold tracking-wide">
        {/* Parent Item */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-between w-full px-4 py-2 rounded-md cursor-pointer transition ${
            open || hasActiveChild
              ? "text-[#FFD233]"
              : "text-gray-400 hover:text-[#FFD233]"
          }`}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon size={18} className="shrink-0" />} {/* ✅ selalu render icon */}
            {!isCollapsed && <span>{label}</span>}
          </div>
          {!isCollapsed &&
            (open ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </button>

        {/* Submenu */}
        {!isCollapsed && (
          <div
            className={`ml-6 overflow-hidden transition-all duration-500 ease-in-out ${
              open ? "max-h-40 mt-2" : "max-h-0"
            }`}
          >
            <div className="flex flex-col">
              {children.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 pl-6 pr-4 py-2 text-sm rounded-md mb-1 cursor-pointer transition-colors duration-300 ${
                      isActive
                        ? "text-[#FFD233] font-bold"
                        : "text-gray-400 hover:text-[#FFD233] font-medium"
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 🔹 Normal Item
  return (
    <NavLink
      to={to || "#"}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-md font-inter font-semibold tracking-wide cursor-pointer transition-colors duration-300 ${
          isActive
            ? "text-[#FFD233] font-bold"
            : "text-gray-400 hover:text-[#FFD233]"
        }`
      }
    >
      {Icon && <Icon size={18} className="shrink-0" />} {/* ✅ icon tidak ikut hilang */}
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
}

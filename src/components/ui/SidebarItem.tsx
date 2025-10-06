import { useState, useEffect } from "react";
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
  const location = useLocation();

  const hasActiveChild =
    children?.some((c) => location.pathname.startsWith(c.to)) ?? false;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hasActiveChild) setOpen(true);
  }, [hasActiveChild]);

  // Parent with children
  if (children && children.length > 0) {
    const parentActiveClass = hasActiveChild
      ? "text-[#FFD233]" // parent kuning kalau ada child aktif
      : "text-gray-400 hover:text-[#FFD233]";

    return (
      <div className="font-inter font-semibold tracking-wide">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex items-center justify-between w-full px-4 py-2 rounded-md cursor-pointer transition ${parentActiveClass}`}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon size={18} className="shrink-0" />}
            {!isCollapsed && <span>{label}</span>}
          </div>
          {!isCollapsed &&
            (open ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </button>

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
                  end
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

  // Leaf item
  return (
    <NavLink
      to={to || "#"}
      end
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-md font-inter font-semibold tracking-wide cursor-pointer transition-colors duration-300 ${
          isActive
            ? "text-[#FFD233] font-bold" // aktif -> kuning
            : "text-gray-400 hover:text-[#FFD233]" // non-aktif -> abu, hover kuning
        }`
      }
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
}

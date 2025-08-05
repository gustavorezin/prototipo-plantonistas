import { useAuth } from "@commons/hooks/use-auth";
import { MenuItem, menuItems } from "@commons/utils/menu-items";
import clsx from "clsx";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

export const MenuDesktop = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div
      className={clsx(
        "hidden md:flex flex-col bg-primary text-white transition-all duration-300 ease-in-out h-screen",
        collapsed ? "w-14" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800 h-16">
        {!collapsed && <h1 className="text-xl font-bold">Plantonistas</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-secondary cursor-pointer"
        >
          {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>
      </div>

      <nav className="flex flex-col flex-1 p-2 space-y-1">
        <div className="flex-1 space-y-1">
          {menuItems.map((item: MenuItem) => (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                "flex items-center gap-4 h-12 px-2 rounded hover:bg-gray-800 transition-colors",
                location.pathname === item.path && "bg-gray-800"
              )}
            >
              <div className="min-w-5">{item.icon}</div>
              <span
                className={clsx(
                  "whitespace-nowrap overflow-hidden transition-all duration-300",
                  collapsed ? "w-0 opacity-0" : "w-full opacity-100"
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
          <div
            className="flex items-center gap-4 h-12 px-2 rounded hover:bg-gray-800 hover:text-red-600 transition-colors cursor-pointer"
            onClick={logout}
          >
            <LogOut size={20} className="min-w-5" />
            <span
              className={clsx(
                "whitespace-nowrap overflow-hidden transition-all duration-300",
                collapsed ? "w-0 opacity-0" : "w-full opacity-100"
              )}
            >
              Sair
            </span>
          </div>
        </div>
      </nav>

      <div className="p-2 border-t border-gray-800 flex items-center gap-2 h-16">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold uppercase shrink-0">
          {user?.name?.[0] || "U"}
        </div>
        {!collapsed && (
          <div className="transition-all duration-300 overflow-hidden">
            <p className="text-sm font-semibold">{user?.name || "Usuário"}</p>
            <p className="text-xs text-secondary capitalize">
              {user?.userType?.toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

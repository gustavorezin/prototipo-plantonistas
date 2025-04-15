import { useAuth } from "@commons/hooks/use-auth";
import clsx from "clsx";
import { Home, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout, updateStatus } = useAuth();
  const location = useLocation();

  const menuItems = [{ name: "Home", icon: <Home size={20} />, path: "/" }];

  const toggleStatus = async () => {
    try {
      const newStatus = !user?.status;
      await updateStatus(newStatus);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const getStatusText = () => {
    if (user?.userType === "DOCTOR") {
      return user?.status ? "Disponível" : "Indisponível";
    } else {
      return user?.status ? "Contratando" : "Não contratando";
    }
  };

  const getStatusColor = () => {
    if (user?.userType === "DOCTOR") {
      return user?.status ? "bg-green-500" : "bg-red-500";
    } else {
      return user?.status ? "bg-blue-500" : "bg-gray-500";
    }
  };

  return (
    <div
      className={clsx(
        "h-screen bg-primary text-white flex flex-col transition-all duration-300 ease-in-out",
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
          {menuItems.map((item) => (
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

      {/* Status Toggle */}
      {!collapsed && user && (
        <div className="p-2 border-t border-gray-800">
          <div
            onClick={toggleStatus}
            className={clsx(
              "flex items-center justify-between p-2 rounded-md mb-2 cursor-pointer transition-colors",
              getStatusColor(),
              "hover:bg-opacity-90"
            )}
          >
            <span className="text-sm font-medium">{getStatusText()}</span>
            <div
              className={clsx(
                "w-4 h-4 rounded-full transition-all",
                user?.status ? "bg-white" : "bg-gray-200"
              )}
            ></div>
          </div>
        </div>
      )}

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

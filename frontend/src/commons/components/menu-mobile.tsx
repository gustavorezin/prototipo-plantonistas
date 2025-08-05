import { useAuth } from "@commons/hooks/use-auth";
import { MenuItem, menuItems } from "@commons/utils/menu-items";
import clsx from "clsx";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

export const MenuMobile = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="relative md:hidden">
      <header className="flex items-center justify-between bg-primary text-white p-4">
        <h1 className="text-xl font-bold">Plantonistas</h1>
        <button onClick={() => setOpen((o) => !o)} className="text-secondary">
          <Menu size={24} />
        </button>
      </header>

      <nav
        className={clsx(
          "absolute inset-x-0 top-14 bg-primary text-white space-y-1 p-2 overflow-hidden transform origin-top transition-transform duration-300 ease-in-out z-10",
          open
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        )}
      >
        {menuItems.map((item: MenuItem) => (
          <Link
            key={item.name}
            to={item.path}
            className={clsx(
              "flex items-center gap-4 h-12 px-2 rounded hover:bg-gray-800 transition-colors",
              location.pathname === item.path && "bg-gray-800"
            )}
            onClick={() => setOpen(false)}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

        <div
          onClick={() => {
            logout();
            setOpen(false);
          }}
          className="flex items-center gap-4 h-12 px-2 rounded hover:bg-gray-800 hover:text-red-600 cursor-pointer"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </div>
      </nav>
    </div>
  );
};

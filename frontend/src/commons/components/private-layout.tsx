import { Outlet } from "react-router";
import { ProtectedRoute } from "./protected-route";
import { MenuDesktop } from "./menu-desktop";
import { MenuMobile } from "./menu-mobile";

export const PrivateLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row h-screen">
        <MenuDesktop />
        <MenuMobile />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};

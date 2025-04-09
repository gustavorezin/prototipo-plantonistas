import { Outlet } from "react-router";
import { ProtectedRoute } from "./protected-route";

export const PrivateLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};

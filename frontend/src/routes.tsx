import { createBrowserRouter } from "react-router";
import { Login } from "@pages/login";
import { Home } from "@pages/home";
import { PrivateLayout } from "@commons/components/private-layout";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: [{ path: "/", element: <Home />, index: true }],
  },
]);

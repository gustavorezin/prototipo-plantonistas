import { createBrowserRouter } from "react-router";
import { Login } from "@pages/login";
import { Home } from "@pages/home";
import { PrivateLayout } from "@commons/components/private-layout";
import { Profile } from "@pages/profile";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

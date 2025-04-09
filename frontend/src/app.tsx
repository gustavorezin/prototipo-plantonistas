import { RouterProvider } from "react-router";
import { AuthProvider } from "./providers/auth-provider";
import { router } from "./routes";

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

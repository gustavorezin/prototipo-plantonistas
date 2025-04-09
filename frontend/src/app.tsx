import { RouterProvider } from "react-router";
import { AuthProvider } from "./providers/auth-provider";
import { router } from "./routes";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <>
      <Toaster richColors />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

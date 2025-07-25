import { SpeedInsights } from "@vercel/speed-insights/react";
import { RouterProvider } from "react-router";
import { AuthProvider } from "@commons/providers/auth-provider";
import { router } from "./routes";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <>
      <SpeedInsights />
      <Toaster richColors />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

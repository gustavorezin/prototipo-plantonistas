import { Navigate } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

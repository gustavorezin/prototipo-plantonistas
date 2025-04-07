import { AuthProvider } from "./contexts/auth-context";
import { Login } from "./pages/login";

export const App = () => {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
};

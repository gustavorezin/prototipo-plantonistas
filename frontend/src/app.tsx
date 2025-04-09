import { Login } from "./pages/login";
import { AuthProvider } from "./providers/auth-provider";

export const App = () => {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
};

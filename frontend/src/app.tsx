import { Login } from "./pages/login";
import { AuthProvider } from "./porviders/auth-provider";

export const App = () => {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
};

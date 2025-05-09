import { AuthContext } from "@commons/contexts/auth-context";
import {
  ILoginRequest,
  IUserAuthProvider,
  usersService,
} from "@services/users-service";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUserAuthProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoginPage = window.location.pathname === "/auth";
    if (!isLoginPage) {
      const fetchSessionUser = async () => {
        const response = await usersService.session();
        const sessionUser = response.data;
        setUser(sessionUser);
        setLoading(false);
      };
      fetchSessionUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (loginPayload: ILoginRequest) => {
    const response = await usersService.login(loginPayload);
    const user = response.data;
    setUser(user);
  };

  const logout = async () => {
    await usersService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

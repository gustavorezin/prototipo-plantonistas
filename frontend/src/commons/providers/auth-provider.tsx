import { AuthContext } from "@commons/contexts/auth-context";
import { isIOS } from "@commons/utils/isIOS";
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
  const [user, setUser] = useState<IUserAuthProvider["user"] | null>(null);
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
    const user = response.data.user;
    const token = response.data.token;

    setUser(user);

    if (isIOS() && token) {
      sessionStorage.setItem("ios_token", token);
    }
  };

  const logout = async () => {
    await usersService.logout();
    setUser(null);
    if (isIOS()) {
      sessionStorage.removeItem("ios_token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

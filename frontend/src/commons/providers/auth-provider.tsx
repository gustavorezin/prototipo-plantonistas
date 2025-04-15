import { useEffect, useState } from "react";
import { AuthContext } from "@commons/contexts/auth-context";
import {
  ILoginRequest,
  IUserAuthProvider,
  usersService,
} from "@services/users-service";
import api from "@commons/lib/api";
import { hospitalsService } from "@services/hospitals-service";
import { doctorsService } from "@services/doctors-service";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUserAuthProvider | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.Authorization = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  const login = async (loginPayload: ILoginRequest) => {
    const response = await usersService.login(loginPayload);

    const { user, token } = response.data;

    setUser(user);
    setToken(token);

    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    api.defaults.headers.Authorization = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    delete api.defaults.headers.Authorization;
  };

  const updateStatus = async (status: boolean) => {
    if (user) {
      const updatedUser = { ...user, status };
      setUser(updatedUser);
      localStorage.setItem("authUser", JSON.stringify(updatedUser));
      if (user.userType === "DOCTOR") {
        doctorsService.updateAvailable(user.id, status);
      } else {
        hospitalsService.updateHiring(user.id, status);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateStatus }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

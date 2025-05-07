import { AuthContext } from "@commons/contexts/auth-context";
import { doctorsService } from "@services/doctors-service";
import { hospitalsService } from "@services/hospitals-service";
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
    const fetchSessionUser = async () => {
      const response = await usersService.session();
      const sessionUser = response.data;
      setUser(sessionUser);
      setLoading(false);
    };

    fetchSessionUser();
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

  const updateStatus = async (status: boolean) => {
    if (user) {
      const updatedUser = { ...user, status };
      setUser(updatedUser);
      if (user.userType === "DOCTOR") {
        doctorsService.updateAvailable(user.id, status);
      } else {
        hospitalsService.updateHiring(user.id, status);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateStatus }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

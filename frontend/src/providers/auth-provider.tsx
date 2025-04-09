import { useEffect, useState } from "react";
import { AuthContext, User } from "../contexts/auth-context";
import { login as loginUser } from "../services/users-service";
import api from "../lib/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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

  const login = async (email: string, password: string) => {
    const response = await loginUser({ email, password });

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

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

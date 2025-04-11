import { createContext } from "react";
import { IUserAuthProvider, ILoginRequest } from "../services/users-service";

interface AuthContextType {
  user: IUserAuthProvider | null;
  token: string | null;
  login: (loginPayload: ILoginRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

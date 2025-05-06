import api from "@commons/lib/api";

export interface IUserAuthProvider {
  id: string;
  name: string;
  status: boolean;
  email: string;
  userType: "HOSPITAL" | "DOCTOR";
}

export interface ILoginRequest {
  email: string;
  password: string;
}

interface ICreateRequest {
  userType: "HOSPITAL" | "DOCTOR";
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  crm?: string;
  specialty?: string;
}

const login = (data: ILoginRequest) => {
  return api.post<IUserAuthProvider>("/users/login", data);
};

const logout = () => {
  return api.post("/users/logout");
};

const create = (data: ICreateRequest) => {
  return api.post("/users", data);
};

const session = () => {
  return api.get<IUserAuthProvider>("/users/session");
};

export const usersService = {
  login,
  logout,
  create,
  session,
};

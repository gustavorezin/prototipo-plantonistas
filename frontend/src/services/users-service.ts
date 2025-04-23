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

interface ILoginResponse {
  user: {
    id: string;
    name: string;
    status: boolean;
    email: string;
    userType: "HOSPITAL" | "DOCTOR";
  };
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
  return api.post<ILoginResponse>("/users/login", data);
};

const logout = () => {
  return api.post("/users/logout");
};

const create = (data: ICreateRequest) => {
  return api.post("/users", data);
};

export const usersService = {
  login,
  logout,
  create,
};

import api from "@commons/lib/api";
import { IDoctor } from "./doctors-service";
import { IHospital } from "./hospitals-service";

export type UserType = "HOSPITAL" | "DOCTOR";

export interface IUser {
  id: string;
  email: string;
  doctor?: IDoctor | null;
  hospital?: IHospital | null;
  userType: UserType;
}

export interface IUserAuthProvider {
  user: {
    id: string;
    name: string;
    email: string;
    userType: UserType;
  };
  token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

interface ICreateRequest {
  userType: UserType;
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  crm?: string;
  specialty?: string;
}

interface IUpdateRequest {
  id: string;
  userType: UserType;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  crm?: string;
  specialties?: string[];
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

const update = (data: IUpdateRequest) => {
  return api.put<IUser>("/users", data);
};

const updatePassword = (data: { password: string }) => {
  return api.put<void>("/users/password", data);
};

const session = () => {
  return api.get<IUserAuthProvider["user"]>("/users/session");
};

const profile = () => {
  return api.get<IUser>("/users/profile");
};

const show = (id: string) => {
  return api.get<IUser>(`/users/${id}`);
};

const sendMail = (toUserId: string, content?: string) => {
  return api.post("/users/send-mail", {
    toUserId,
    content,
  });
};

export const usersService = {
  login,
  logout,
  create,
  update,
  updatePassword,
  session,
  profile,
  show,
  sendMail,
};

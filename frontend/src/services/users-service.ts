import { AxiosResponse } from "axios";
import api from "../lib/api";

interface LoginRequest {
  email: string;
  password: string;
}

interface CreateRequest {
  userType: "HOSPITAL" | "DOCTOR";
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  crm?: string;
  specialty?: string;
}

export const login = (data: LoginRequest): Promise<AxiosResponse> => {
  return api.post("/users/login", data);
};

export const create = (data: CreateRequest) => {
  return api.post("/users", data);
};

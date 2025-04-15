import api from "@commons/lib/api";
import { IDoctor } from "./doctors-service";
import { IHospital } from "./hospitals-service";

export type IRequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED"
  | "CONTRACTED";

export interface IRequest {
  id: string;
  hospitalId: string;
  doctorId: string;
  status: IRequestStatus;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
  doctor?: IDoctor;
  hospital?: IHospital;
}

interface ICreateRequest {
  doctorId: string;
  hospitalId: string;
  message?: string;
}

const create = ({ doctorId, hospitalId, message = "" }: ICreateRequest) => {
  return api.post("/requests", {
    doctorId,
    hospitalId,
    message,
  });
};

const listByDoctor = (doctorId: string) => {
  return api.get<IRequest[]>(`/requests/doctor/${doctorId}`);
};

const listByHospital = (hospitalId: string) => {
  return api.get<IRequest[]>(`/requests/hospital/${hospitalId}`);
};

export const requestsService = {
  create,
  listByDoctor,
  listByHospital,
};

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

const listByDoctor = (doctorId: string) => {
  return api.get<IRequest[]>(`/requests/doctor/${doctorId}`);
};

const listByHospital = (hospitalId: string) => {
  return api.get<IRequest[]>(`/requests/hospital/${hospitalId}`);
};

export const requestsService = {
  listByDoctor,
  listByHospital,
};

import api from "@commons/lib/api";

export interface IRequest {
  id: string;
  hospitalId: string;
  doctorId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "CONTRACTED";
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const listByDoctor = (doctorId: string) => {
  return api.get<IRequest[]>(`/requests/doctor/${doctorId}`);
};

export const requestsService = {
  listByDoctor,
};

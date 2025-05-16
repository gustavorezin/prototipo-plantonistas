import api from "@commons/lib/api";
import { ISpecialty } from "./specialties-service";

export type JobStatus = "OPEN" | "CLOSED" | "CANCELLED" | "COMPLETED";

export interface IJob {
  id: string;
  hospitalId: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  slots: 5;
  filledSlots: 0;
  status: JobStatus;
  specialties: ISpecialty[];
}

interface ICreateRequest {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  slots: number;
  specialtyIds?: string[];
}

const create = (data: ICreateRequest) => {
  return api.post("/jobs", data);
};

const listByHospital = () => {
  return api.get<IJob[]>("/jobs");
};

export const jobsService = {
  create,
  listByHospital,
};

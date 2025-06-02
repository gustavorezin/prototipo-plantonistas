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

interface IUpdateRequest extends ICreateRequest {
  id: string;
  status: JobStatus;
}

const create = (data: ICreateRequest) => {
  return api.post("/jobs", data);
};

const update = (data: IUpdateRequest) => {
  return api.put(`/jobs/${data.id}`, data);
};

const show = (id: string) => {
  return api.get<IJob>(`/jobs/${id}`);
};

const listByHospital = () => {
  return api.get<IJob[]>("/jobs/hospital");
};

const list = () => {
  return api.get<IJob[]>("/jobs");
};

const remove = (id: string) => {
  return api.delete(`/jobs/${id}`);
};

export const jobsService = {
  create,
  update,
  show,
  listByHospital,
  list,
  remove,
};

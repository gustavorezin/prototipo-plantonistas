import api from "@commons/lib/api";
import { UserType } from "./users-service";

export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface IApplication {
  id: string;
  jobId: string;
  doctorId: string;
  status: ApplicationStatus;
}

export interface IApplicationWithDoctorInfo extends IApplication {
  doctor: {
    name: string;
    crm: string;
  };
}

const create = (jobId: string) => {
  return api.post(`/applications`, { jobId });
};

const updateStatus = (applicationId: string, status: ApplicationStatus) => {
  return api.put(`/applications/status`, { applicationId, status });
};

const listByJobId = (jobId: string) => {
  return api.get<IApplicationWithDoctorInfo[]>(`/applications/${jobId}`);
};

const listByUser = (userType: UserType) => {
  return api.get<IApplication[]>(`/applications/user/${userType}`);
};

export const applicationService = {
  create,
  updateStatus,
  listByJobId,
  listByUser,
};

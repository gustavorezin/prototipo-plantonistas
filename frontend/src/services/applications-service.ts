import api from "@commons/lib/api";

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

const listByDoctor = () => {
  return api.get<IApplication[]>("/applications");
};

export const applicationService = {
  create,
  updateStatus,
  listByJobId,
  listByDoctor,
};

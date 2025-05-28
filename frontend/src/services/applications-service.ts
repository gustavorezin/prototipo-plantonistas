import api from "@commons/lib/api";

export type ApplicationStatus = "PENDING" | "ACCEPT" | "REJECTED";

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

const listByJobId = (jobId: string) => {
  return api.get<IApplicationWithDoctorInfo[]>(`/applications/${jobId}`);
};

export const applicationService = {
  create,
  listByJobId,
};

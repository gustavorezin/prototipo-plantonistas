import api from "@commons/lib/api";

export type ApplicationStatus = "OPEN" | "CLOSED" | "CANCELLED" | "COMPLETED";

export interface IApplication {
  id: string;
  jobId: string;
  doctorId: string;
  status: ApplicationStatus;
}
const create = (jobId: string) => {
  return api.post(`/applications`, { jobId });
};

export const applicationService = {
  create,
};

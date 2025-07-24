import { ApplicationStatus } from "./enums/ApplicationStatus";

export interface IApplication {
  id: string;
  jobId: string;
  doctorId: string;
  status: ApplicationStatus;
}

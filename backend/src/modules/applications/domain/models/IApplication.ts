import { ApplicationStatus } from "prisma/generated/client";

export interface IApplication {
  id: string;
  jobId: string;
  doctorId: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

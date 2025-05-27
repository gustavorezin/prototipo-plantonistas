import { IApplication } from "../models/IApplication";

export interface IApplicationsRepository {
  create: (jobId: string, doctorId: string) => Promise<IApplication>;
  findByJobIdAndDoctorId: (
    jobId: string,
    doctorId: string
  ) => Promise<IApplication | null>;
}

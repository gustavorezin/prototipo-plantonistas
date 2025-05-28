import { IApplication } from "../models/IApplication";
import { IApplicationWithDoctorInfo } from "../models/IApplicationWithDoctorInfo";

export interface IApplicationsRepository {
  create: (jobId: string, doctorId: string) => Promise<IApplication>;
  findByJobIdAndDoctorId: (
    jobId: string,
    doctorId: string
  ) => Promise<IApplication | null>;
  findAllByJobId: (jobId: string) => Promise<IApplicationWithDoctorInfo[]>;
}

import { ApplicationStatus } from "../models/enums/ApplicationStatus";
import { IApplication } from "../models/IApplication";
import { IApplicationWithDoctorInfo } from "../models/IApplicationWithDoctorInfo";

export interface IApplicationsRepository {
  create: (jobId: string, doctorId: string) => Promise<IApplication>;
  updateStatus: (
    applicationId: string,
    status: ApplicationStatus
  ) => Promise<IApplication>;
  findById: (id: string) => Promise<IApplication | null>;
  findByJobIdAndDoctorId: (
    jobId: string,
    doctorId: string
  ) => Promise<IApplication | null>;
  findAllByJobId: (jobId: string) => Promise<IApplicationWithDoctorInfo[]>;
  findAllByDoctorId: (doctorId: string) => Promise<IApplication[]>;
  findAllByHospitalId: (hospitalId: string) => Promise<IApplication[]>;
}

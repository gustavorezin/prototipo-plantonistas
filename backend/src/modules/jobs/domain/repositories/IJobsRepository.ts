import { ICreateJob } from "../models/ICreateJob";
import { IJob } from "../models/IJob";

export interface IJobsRepository {
  create(data: ICreateJob): Promise<Omit<IJob, "specialties">>;
  findAllByHospitalId(hospitalId: string): Promise<IJob[]>;
}

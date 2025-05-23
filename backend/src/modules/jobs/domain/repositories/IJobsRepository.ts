import { IJob } from "../models/IJob";
import { CreateJobSchema } from "../models/schemas/CreateJobSchema";

export interface IJobsRepository {
  create(data: CreateJobSchema): Promise<Omit<IJob, "specialties">>;
  findAllByHospitalId(hospitalId: string): Promise<IJob[]>;
  findAll(): Promise<IJob[]>;
}

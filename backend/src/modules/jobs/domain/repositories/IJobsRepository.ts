import { IJob } from "../models/IJob";
import { CreateJobSchema } from "../models/schemas/CreateJobSchema";
import { UpdateJobSchema } from "../models/schemas/UpdateJobSchema";

export interface IJobsRepository {
  create(data: CreateJobSchema): Promise<Omit<IJob, "specialties">>;
  update(data: UpdateJobSchema): Promise<Omit<IJob, "specialties">>;
  findAllByHospitalId(hospitalId: string): Promise<IJob[]>;
  findAll(): Promise<IJob[]>;
}

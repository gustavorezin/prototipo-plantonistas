import { JobStatus } from "prisma/generated/client";
import { IJob } from "../models/IJob";
import { CreateJobSchema } from "../models/schemas/CreateJobSchema";
import { UpdateJobSchema } from "../models/schemas/UpdateJobSchema";
import { IJobWithHospitalInfo } from "../models/IJobWithHospitalInfo";

export interface IJobsRepository {
  create(data: CreateJobSchema): Promise<IJob>;
  update(data: UpdateJobSchema): Promise<IJob>;
  updateStatus(id: string, status: JobStatus): Promise<IJob>;
  incrementFilledSlots(id: string): Promise<void>;
  decrementFilledSlots(id: string): Promise<void>;
  findById(id: string): Promise<IJob | null>;
  findAllByHospitalId(hospitalId: string): Promise<IJob[]>;
  findAll(): Promise<IJobWithHospitalInfo[]>;
  delete(id: string): Promise<void>;
}

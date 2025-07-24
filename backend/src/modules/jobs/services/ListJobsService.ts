import { inject, injectable } from "tsyringe";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";
import { IJob } from "../domain/models/IJob";
import { IJobWithHospitalInfo } from "../domain/models/IJobWithHospitalInfo";

@injectable()
export class ListJobsService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute(): Promise<IJobWithHospitalInfo[]> {
    const jobs = await this.jobsRepository.findAll();
    return jobs;
  }
}

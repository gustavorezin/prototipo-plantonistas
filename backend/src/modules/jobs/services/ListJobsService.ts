import { inject, injectable } from "tsyringe";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";
import { IJob } from "../domain/models/IJob";

@injectable()
export class ListJobsService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute(): Promise<IJob[]> {
    const jobs = await this.jobsRepository.findAll();
    return jobs;
  }
}

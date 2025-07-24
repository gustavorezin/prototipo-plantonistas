import { inject, injectable } from "tsyringe";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";

@injectable()
export class ListJobsByHospitalService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute(hospitalId: string) {
    const jobs = await this.jobsRepository.findAllByHospitalId(hospitalId);
    return jobs;
  }
}

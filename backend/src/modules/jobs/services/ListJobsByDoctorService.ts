import { inject, injectable } from "tsyringe";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";

@injectable()
export class ListJobsByDoctorService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute(doctorId: string) {
    const jobs = await this.jobsRepository.findAllByDoctorId(doctorId);
    return jobs;
  }
}

import { inject, injectable } from "tsyringe";
import { UpdateJobSchema } from "../domain/models/schemas/UpdateJobSchema";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";

@injectable()
export class DeleteJobService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute(id: string) {
    const job = await this.jobsRepository.delete(id);
    return job;
  }
}

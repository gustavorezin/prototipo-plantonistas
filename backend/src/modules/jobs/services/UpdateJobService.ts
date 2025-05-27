import { inject, injectable } from "tsyringe";
import { UpdateJobSchema } from "../domain/models/schemas/UpdateJobSchema";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";

@injectable()
export class UpdateJobService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute(data: UpdateJobSchema) {
    const job = await this.jobsRepository.update(data);
    return job;
  }
}

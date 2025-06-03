import { inject, injectable } from "tsyringe";
import { UpdateStatusJobSchema } from "../domain/models/schemas/UpdateStatusJobSchema";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";

@injectable()
export class UpdateStatusJobService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute({ jobId, status }: UpdateStatusJobSchema) {
    const job = await this.jobsRepository.updateStatus(jobId, status);
    return job;
  }
}

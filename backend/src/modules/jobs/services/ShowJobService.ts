import { inject, injectable } from "tsyringe";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";
import { IJob } from "../domain/models/IJob";
import { AppError } from "@commons/error/AppError";

@injectable()
export class ShowJobService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute(id: string): Promise<IJob> {
    const job = await this.jobsRepository.findById(id);

    if (!job) {
      throw new AppError("Vaga não encontrada");
    }

    return job;
  }
}

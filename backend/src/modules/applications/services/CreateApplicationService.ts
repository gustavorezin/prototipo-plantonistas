import { inject, injectable } from "tsyringe";
import type { IApplicationsRepository } from "../domain/repositories/IApplicationsRepository";
import { AppError } from "@commons/error/AppError";
import type { IJobsRepository } from "@modules/jobs/domain/repositories/IJobsRepository";

@injectable()
export class CreateApplicationService {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository,

    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute({ jobId, doctorId }: { jobId: string; doctorId: string }) {
    const existing = await this.applicationsRepository.findByJobIdAndDoctorId(
      jobId,
      doctorId
    );

    if (existing) {
      throw new AppError("Você já se inscreveu para esta vaga");
    }

    const job = await this.jobsRepository.findById(jobId);
    if (!job) {
      throw new AppError("Vaga não encontrada");
    }
    if (job.status !== "OPEN") {
      throw new AppError("Vaga fechada para novas inscrições");
    }

    const application = await this.applicationsRepository.create(
      jobId,
      doctorId
    );
    return application;
  }
}

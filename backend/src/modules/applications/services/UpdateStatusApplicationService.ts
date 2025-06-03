import { inject, injectable } from "tsyringe";
import { UpdateStatusApplicationSchema } from "../domain/models/schemas/UpdateStatusApplicationSchema";
import type { IApplicationsRepository } from "../domain/repositories/IApplicationsRepository";
import { AppError } from "@commons/error/AppError";
import type { IJobsRepository } from "@modules/jobs/domain/repositories/IJobsRepository";

@injectable()
export class UpdateStatusApplicationService {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository,
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository
  ) {}

  async execute({ applicationId, status }: UpdateStatusApplicationSchema) {
    const applicationExists = await this.applicationsRepository.findById(
      applicationId
    );
    if (!applicationExists) {
      throw new AppError("Candidatura não encontrada");
    }

    if (applicationExists.status !== "ACCEPTED" && status === "ACCEPTED") {
      const job = await this.jobsRepository.findById(applicationExists?.jobId);
      if (!job) {
        throw new AppError("Vaga não encontrada");
      }
      if (job.status !== "OPEN") {
        throw new AppError("A vaga não está aberta para candidaturas");
      }
      if (job.filledSlots >= job.slots) {
        throw new AppError("Todas as vagas já foram preenchidas");
      }
      await this.jobsRepository.incrementFilledSlots(job.id);
    }

    if (applicationExists.status === "ACCEPTED" && status !== "ACCEPTED") {
      await this.jobsRepository.decrementFilledSlots(applicationExists.jobId);
    }

    const application = await this.applicationsRepository.updateStatus(
      applicationId,
      status
    );
    return application;
  }
}

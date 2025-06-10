import { inject, injectable } from "tsyringe";
import { UpdateStatusApplicationSchema } from "../domain/models/schemas/UpdateStatusApplicationSchema";
import type { IApplicationsRepository } from "../domain/repositories/IApplicationsRepository";
import { AppError } from "@commons/error/AppError";
import type { IJobsRepository } from "@modules/jobs/domain/repositories/IJobsRepository";
import { SendMailToUserService } from "@modules/users/services/SendMailToUserService";

const statusLabels: Record<"PENDING" | "ACCEPTED" | "REJECTED", string> = {
  PENDING: "Pendente",
  ACCEPTED: "Aceita",
  REJECTED: "Rejeitada",
};

@injectable()
export class UpdateStatusApplicationService {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository,
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository,
    @inject("SendMailToUserService")
    private sendMailToUserService: SendMailToUserService
  ) {}

  async execute({ applicationId, status }: UpdateStatusApplicationSchema) {
    const applicationExists = await this.applicationsRepository.findById(
      applicationId
    );
    if (!applicationExists) {
      throw new AppError("Candidatura não encontrada");
    }

    const job = await this.jobsRepository.findById(applicationExists?.jobId);
    if (!job) {
      throw new AppError("Vaga não encontrada");
    }

    if (applicationExists.status !== "ACCEPTED" && status === "ACCEPTED") {
      if (job.status !== "OPEN") {
        throw new AppError("A vaga não está aberta");
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

    const translatedStatus = statusLabels[status];

    this.sendMailToUserService.execute({
      fromUserId: job.hospitalId,
      toUserId: application.doctorId,
      content: `Sua candidatura para a vaga "${job.title}" foi atualizada para o status "${translatedStatus}".`,
    });

    return application;
  }
}

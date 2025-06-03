import { inject, injectable } from "tsyringe";
import { UpdateStatusJobSchema } from "../domain/models/schemas/UpdateStatusJobSchema";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";
import { ListByJobApplicationService } from "@modules/applications/services/ListByJobApplicationService";
import { UpdateStatusApplicationService } from "@modules/applications/services/UpdateStatusApplicationService";

@injectable()
export class UpdateStatusJobService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository,

    @inject("ListByJobApplicationService")
    private listByJobApplicationService: ListByJobApplicationService,

    @inject("UpdateStatusApplicationService")
    private updateStatusApplicationService: UpdateStatusApplicationService
  ) {}

  async execute({ jobId, status }: UpdateStatusJobSchema) {
    const job = await this.jobsRepository.updateStatus(jobId, status);

    if (status !== "OPEN") {
      const applications = await this.listByJobApplicationService.execute(
        jobId
      );

      for (const application of applications) {
        if (application.status === "PENDING" || status === "CANCELLED") {
          await this.updateStatusApplicationService.execute({
            applicationId: application.id,
            status: "REJECTED",
          });
        }
      }
    }

    return job;
  }
}

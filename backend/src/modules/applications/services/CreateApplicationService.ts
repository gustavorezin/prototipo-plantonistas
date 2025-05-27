import { inject, injectable } from "tsyringe";
import type { IApplicationsRepository } from "../domain/repositories/IApplicationsRepository";
import { AppError } from "@commons/error/AppError";

@injectable()
export class CreateApplicationService {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository
  ) {}

  async execute({ jobId, doctorId }: { jobId: string; doctorId: string }) {
    const existing = await this.applicationsRepository.findByJobIdAndDoctorId(
      jobId,
      doctorId
    );

    if (existing) {
      throw new AppError("Você já se inscreveu para esta vaga");
    }

    const application = await this.applicationsRepository.create(
      jobId,
      doctorId
    );
    return application;
  }
}

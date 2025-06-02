import { inject, injectable } from "tsyringe";
import { UpdateStatusApplicationSchema } from "../domain/models/schemas/UpdateStatusApplicationSchema";
import type { IApplicationsRepository } from "../domain/repositories/IApplicationsRepository";

@injectable()
export class UpdateStatusApplicationService {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository
  ) {}

  async execute({ applicationId, status }: UpdateStatusApplicationSchema) {
    const application = await this.applicationsRepository.updateStatus(
      applicationId,
      status
    );
    return application;
  }
}

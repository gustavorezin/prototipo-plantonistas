import { inject, injectable } from "tsyringe";
import type { IApplicationsRepository } from "../domain/repositories/IApplicationsRepository";

@injectable()
export class ListByJobApplicationService {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository
  ) {}

  async execute(jobId: string) {
    const applications = await this.applicationsRepository.findAllByJobId(
      jobId
    );
    return applications;
  }
}

import { inject, injectable } from "tsyringe";
import type { IApplicationsRepository } from "../domain/repositories/IApplicationsRepository";
import { AppError } from "@commons/error/AppError";

@injectable()
export class ListByDoctorApplicationService {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository
  ) {}

  async execute(doctorId: string) {
    const applications = await this.applicationsRepository.findAllByDoctorId(
      doctorId
    );
    return applications;
  }
}

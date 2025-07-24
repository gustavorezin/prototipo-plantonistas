import { inject, injectable } from "tsyringe";
import type { IApplicationsRepository } from "../domain/repositories/IApplicationsRepository";
import { UserType } from "@modules/users/domain/models/enums/UserType";

@injectable()
export class ListByUserApplicationService {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository
  ) {}

  async execute(id: string, userType: UserType) {
    if (userType === UserType.DOCTOR) {
      return await this.applicationsRepository.findAllByDoctorId(id);
    }

    if (userType === UserType.HOSPITAL) {
      return await this.applicationsRepository.findAllByHospitalId(id);
    }
  }
}

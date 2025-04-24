import { inject, injectable } from "tsyringe";
import type { IDoctorsRepository } from "../domain/repositories/IDoctorsRepository";

@injectable()
export class UpdateAvailableDoctorService {
  constructor(
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository
  ) {}

  async execute(id: string, available: boolean): Promise<void> {
    await this.doctorsRepository.updateAvailableStatus(id, available);
  }
}

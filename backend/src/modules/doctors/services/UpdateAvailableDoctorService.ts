import { inject, injectable } from "tsyringe";
import type { IDoctorsRepository } from "../domain/repositories/IDoctorsRepository";
import { AppError } from "@commons/error/AppError";

@injectable()
export class UpdateAvailableDoctorService {
  constructor(
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository
  ) {}

  async execute(id: string, available: boolean): Promise<void> {
    const doctor = await this.doctorsRepository.findById(id);
    if (!doctor) {
      throw new AppError("Doctor not found");
    }
    await this.doctorsRepository.updateAvailableStatus(id, available);
  }
}

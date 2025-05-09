import { inject, injectable } from "tsyringe";
import type { IDoctorsRepository } from "../domain/repositories/IDoctorsRepository";
import { AppError } from "@commons/error/AppError";

@injectable()
export class ShowDoctorService {
  constructor(
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository
  ) {}

  async execute(id: string) {
    const doctor = await this.doctorsRepository.findById(id);
    if (!doctor) {
      throw new AppError("Médico não encontrado");
    }
    return doctor;
  }
}

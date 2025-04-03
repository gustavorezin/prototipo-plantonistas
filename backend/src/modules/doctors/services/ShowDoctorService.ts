import { inject, injectable } from "tsyringe";
import { IDoctorsRepository } from "../domain/repositories/IDoctorsRepository";
import { AppError } from "@commons/error/AppError";

@injectable()
export class ShowDoctorService {
  constructor(
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository
  ) {}

  async execute(id: string) {
    const customer = await this.doctorsRepository.findById(id);
    if (!customer) {
      throw new AppError("Doctor not found");
    }
    return customer;
  }
}

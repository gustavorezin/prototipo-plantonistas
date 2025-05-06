import { inject, injectable } from "tsyringe";
import type { IHospitalsRepository } from "../domain/repositories/IHospitalsRepository";

@injectable()
export class UpdateHiringHospitalService {
  constructor(
    @inject("HospitalsRepository")
    private hospitalsRepository: IHospitalsRepository
  ) {}

  async execute(id: string, hiring: boolean): Promise<void> {
    await this.hospitalsRepository.updateHiringStatus(id, hiring);
  }
}

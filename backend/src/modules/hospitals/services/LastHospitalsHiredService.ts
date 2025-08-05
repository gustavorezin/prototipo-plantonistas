import { inject, injectable } from "tsyringe";
import type { IHospitalsRepository } from "../domain/repositories/IHospitalsRepository";
import { IHospital } from "../domain/models/IHospital";

@injectable()
export class LastHospitalsHiredService {
  constructor(
    @inject("HospitalsRepository")
    private hospitalsRepository: IHospitalsRepository
  ) {}

  async execute(doctorId: string): Promise<IHospital[]> {
    const hospitals = await this.hospitalsRepository.findAllHiredByDoctorId(
      doctorId
    );
    return hospitals;
  }
}

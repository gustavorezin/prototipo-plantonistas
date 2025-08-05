import { inject, injectable } from "tsyringe";
import type { IDoctorsRepository } from "../domain/repositories/IDoctorsRepository";
import { IDoctor } from "../domain/models/IDoctor";

@injectable()
export class LastDoctorsHiredService {
  constructor(
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository
  ) {}

  async execute(hospitalId: string): Promise<IDoctor[]> {
    const doctors = await this.doctorsRepository.findAllHiredByHospitalId(
      hospitalId
    );
    return doctors;
  }
}

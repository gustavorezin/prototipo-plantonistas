import { inject, injectable } from "tsyringe";
import type { ISpecialtiesRepository } from "../domain/repositories/ISpecialtiesRepository";
import { ISpecialty } from "../domain/models/ISpecialty";

@injectable()
export class ListSpecialtiesByDoctorService {
  constructor(
    @inject("SpecialtiesRepository")
    private specialtiesRepository: ISpecialtiesRepository
  ) {}

  async execute(id: string): Promise<ISpecialty[]> {
    const specialties = await this.specialtiesRepository.findByDoctorId(id);
    return specialties;
  }
}

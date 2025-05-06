import { inject, injectable } from "tsyringe";
import type { ISpecialtiesRepository } from "../domain/repositories/ISpecialtiesRepository";
import { ISpecialty } from "../domain/models/ISpecialty";

@injectable()
export class ListSpecialtiesService {
  constructor(
    @inject("SpecialtiesRepository")
    private specialtiesRepository: ISpecialtiesRepository
  ) {}

  async execute(): Promise<ISpecialty[]> {
    const specialties = await this.specialtiesRepository.findAll();
    return specialties;
  }
}

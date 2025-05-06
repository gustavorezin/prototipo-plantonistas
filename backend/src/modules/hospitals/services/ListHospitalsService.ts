import { inject, injectable } from "tsyringe";
import type { IHospitalsRepository } from "../domain/repositories/IHospitalsRepository";
import { IHospital } from "../domain/models/IHospital";

@injectable()
export class ListHospitalsService {
  constructor(
    @inject("HospitalsRepository")
    private hospitalsRepository: IHospitalsRepository
  ) {}

  async execute(): Promise<IHospital[]> {
    const hospitals = await this.hospitalsRepository.findAll();
    return hospitals;
  }
}

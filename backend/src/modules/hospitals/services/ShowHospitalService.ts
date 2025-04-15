import { inject, injectable } from "tsyringe";
import { IHospitalsRepository } from "../domain/repositories/IHospitalsRepository";
import { IHospital } from "../domain/models/IHospital";

@injectable()
export class ShowHospitalService {
  constructor(
    @inject("HospitalsRepository")
    private hospitalsRepository: IHospitalsRepository
  ) {}

  async execute(id: string): Promise<IHospital | null> {
    const hospital = await this.hospitalsRepository.findById(id);
    return hospital;
  }
}

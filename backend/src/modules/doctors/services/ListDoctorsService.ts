import { inject, injectable } from "tsyringe";
import type { IDoctorsRepository } from "../domain/repositories/IDoctorsRepository";
import { IDoctor } from "../domain/models/IDoctor";

@injectable()
export class ListDoctorsService {
  constructor(
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository
  ) {}

  async execute(): Promise<IDoctor[]> {
    const doctors = await this.doctorsRepository.findAll();
    return doctors;
  }
}

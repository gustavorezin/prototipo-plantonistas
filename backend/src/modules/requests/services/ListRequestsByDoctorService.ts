import { inject, injectable } from "tsyringe";
import type { IRequestsRepository } from "../domain/repositories/IRequestsRepositoy";

@injectable()
export class ListRequestsByDoctorService {
  constructor(
    @inject("RequestsRepository")
    private requestsRepository: IRequestsRepository
  ) {}

  async execute(doctorId: string) {
    const requests = await this.requestsRepository.findByDoctorId(doctorId);
    return requests;
  }
}

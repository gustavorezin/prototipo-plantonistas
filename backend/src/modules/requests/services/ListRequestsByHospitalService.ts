import { inject, injectable } from "tsyringe";
import { IRequestsRepository } from "../domain/repositories/IRequestsRepositoy";

@injectable()
export class ListRequestsByHospitalService {
  constructor(
    @inject("RequestsRepository")
    private requestsRepository: IRequestsRepository
  ) {}

  async execute(hospitalId: string) {
    const requests = await this.requestsRepository.findByHospitalId(hospitalId);
    return requests;
  }
}

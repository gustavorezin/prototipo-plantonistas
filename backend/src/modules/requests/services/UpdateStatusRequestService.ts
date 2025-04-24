import { inject, injectable } from "tsyringe";
import { IUpdateStatusRequest } from "../domain/models/IUpdateStatusRequest";
import type { IRequestsRepository } from "../domain/repositories/IRequestsRepositoy";

@injectable()
export class UpdateStatusRequestService {
  constructor(
    @inject("RequestsRepository")
    private requestsRepository: IRequestsRepository
  ) {}

  async execute({ id, status }: IUpdateStatusRequest) {
    const request = await this.requestsRepository.updateStatus({ id, status });
    return request;
  }
}

import { inject, injectable } from "tsyringe";
import { IRequestsRepository } from "../domain/repositories/IRequestsRepositoy";
import { ICreateRequest } from "../domain/models/ICreateRequest";
import { AppError } from "@commons/error/AppError";

@injectable()
export class CreateRequestService {
  constructor(
    @inject("RequestsRepository")
    private requestsRepository: IRequestsRepository
  ) {}

  async execute(data: ICreateRequest) {
    const requestExists =
      await this.requestsRepository.findByDoctorIdAndHospitalId(
        data.doctorId,
        data.hospitalId
      );
    if (requestExists) {
      throw new AppError("Request already exists");
    }

    const request = await this.requestsRepository.create(data);
    return request;
  }
}

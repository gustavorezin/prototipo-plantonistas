import { inject, injectable } from "tsyringe";
import { IRequestsRepository } from "../domain/repositories/IRequestsRepositoy";
import { ICreateRequest } from "../domain/models/ICreateRequest";
import { AppError } from "@commons/error/AppError";
import { EtherealMailProvider } from "@commons/providers/EtherealMailProvider";
import { IDoctorsRepository } from "@modules/doctors/domain/repositories/IDoctorsRepository";
import { IHospitalsRepository } from "@modules/hospitals/domain/repositories/IHospitalsRepository";

@injectable()
export class CreateRequestService {
  constructor(
    @inject("RequestsRepository")
    private requestsRepository: IRequestsRepository,
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository,
    @inject("HospitalsRepository")
    private hospitalsRepository: IHospitalsRepository
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

    const doctor = await this.doctorsRepository.findById(data.doctorId);
    if (!doctor) {
      throw new AppError("Doctor not found");
    }

    const hospital = await this.hospitalsRepository.findNameAndEmailById(
      data.hospitalId
    );
    if (!hospital) {
      throw new AppError("Hospital not found");
    }

    await EtherealMailProvider.sendMail({
      to: {
        name: doctor.name,
        email: "medico@email.com" /* doctor.email */,
      },
      from: {
        name: hospital.name,
        email: hospital.email /* hospital.email */,
      },
      subject: "Solicitação de consulta",
      content: `Olá ${doctor.name}, você recebeu uma solicitação de ${hospital.name}.\n\n${data.message}`,
    });
    return request;
  }
}

import { inject, injectable } from "tsyringe";
import type { IRequestsRepository } from "../domain/repositories/IRequestsRepositoy";
import { ICreateRequest } from "../domain/models/ICreateRequest";
import { AppError } from "@commons/error/AppError";
import { EtherealMailProvider } from "@commons/providers/EtherealMailProvider";
import type { IDoctorsRepository } from "@modules/doctors/domain/repositories/IDoctorsRepository";
import type { IHospitalsRepository } from "@modules/hospitals/domain/repositories/IHospitalsRepository";

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

    const doctor = await this.doctorsRepository.findNameAndEmailById(
      data.doctorId
    );
    if (!doctor) {
      throw new AppError("Doctor not found");
    }

    const hospital = await this.hospitalsRepository.findNameAndEmailById(
      data.hospitalId
    );
    if (!hospital) {
      throw new AppError("Hospital not found");
    }

    const isDoctorSender = data.sender === "DOCTOR";

    const sender = {
      name: isDoctorSender ? doctor.name : hospital.name,
      email: isDoctorSender ? doctor.email : hospital.email,
    };

    const receiver = {
      name: isDoctorSender ? hospital.name : doctor.name,
      email: isDoctorSender ? hospital.email : doctor.email,
    };

    await EtherealMailProvider.sendMail({
      to: {
        name: receiver.name,
        email: receiver.email,
      },
      from: {
        name: sender.name,
        email: sender.email,
      },
      subject: "Solicitação de consulta",
      content: `Olá ${receiver.name}, você recebeu uma solicitação de ${sender.name}.\n\n${data.message}`,
    });
    return request;
  }
}

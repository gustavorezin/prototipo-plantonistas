import { prisma } from "@commons/infra/prisma/prismaClient";
import { ICreateRequest } from "@modules/requests/domain/models/ICreateRequest";
import { IRequest } from "@modules/requests/domain/models/IRequest";
import { IRequestWithDoctor } from "@modules/requests/domain/models/IRequestWithDoctor";
import { IRequestWithHospital } from "@modules/requests/domain/models/IRequestWithHospital";
import { IRequestsRepository } from "@modules/requests/domain/repositories/IRequestsRepositoy";
import { RequestStatus } from "@prisma/client";

export class RequestsRepository implements IRequestsRepository {
  async create({
    hospitalId,
    doctorId,
    message = "",
  }: ICreateRequest): Promise<IRequest> {
    const request = await prisma.request.create({
      data: {
        hospitalId,
        doctorId,
        message,
        status: RequestStatus.PENDING,
      },
    });
    return request;
  }

  async findByDoctorId(doctorId: string): Promise<IRequestWithHospital[]> {
    const requests = await prisma.request.findMany({
      where: {
        doctorId,
      },
      include: {
        hospital: true,
      },
    });
    return requests;
  }

  async findByHospitalId(hospitalId: string): Promise<IRequestWithDoctor[]> {
    const requests = await prisma.request.findMany({
      where: {
        hospitalId,
      },
      include: {
        doctor: true,
      },
    });
    return requests;
  }

  async findByDoctorIdAndHospitalId(
    doctorId: string,
    hospitalId: string
  ): Promise<IRequest | null> {
    const request = await prisma.request.findFirst({
      where: {
        doctorId,
        hospitalId,
      },
    });
    return request;
  }
}

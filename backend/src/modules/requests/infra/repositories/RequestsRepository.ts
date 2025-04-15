import { prisma } from "@commons/infra/prisma/prismaClient";
import { IRequest } from "@modules/requests/domain/models/IRequest";
import { IRequestWithDoctor } from "@modules/requests/domain/models/IRequestWithDoctor";
import { IRequestWithHospital } from "@modules/requests/domain/models/IRequestWithHospital";
import { IRequestsRepository } from "@modules/requests/domain/repositories/IRequestsRepositoy";

export class RequestsRepository implements IRequestsRepository {
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
}

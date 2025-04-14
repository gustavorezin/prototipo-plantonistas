import { prisma } from "@commons/infra/prisma/prismaClient";
import { IRequest } from "@modules/requests/domain/models/IRequest";
import { IRequestsRepository } from "@modules/requests/domain/repositories/IRequestsRepositoy";

export class RequestsRepository implements IRequestsRepository {
  async findByDoctorId(doctorId: string): Promise<IRequest[]> {
    const requests = await prisma.request.findMany({
      where: {
        doctorId,
      },
    });
    return requests;
  }

  async findByHospitalId(hospitalId: string): Promise<IRequest[]> {
    const requests = await prisma.request.findMany({
      where: {
        hospitalId,
      },
    });
    return requests;
  }
}

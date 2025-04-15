import { prisma } from "@commons/infra/prisma/prismaClient";
import { IDoctor } from "@modules/doctors/domain/models/IDoctor";
import { IDoctorsRepository } from "@modules/doctors/domain/repositories/IDoctorsRepository";

export class DoctorsRepository implements IDoctorsRepository {
  async updateAvailableStatus(id: string, available: boolean): Promise<void> {
    await prisma.doctor.update({
      where: {
        userId: id,
      },
      data: {
        available,
      },
    });
  }

  async findByCrm(crm: string): Promise<IDoctor | null> {
    const doctor = await prisma.doctor.findUnique({
      where: {
        crm,
      },
    });

    return doctor;
  }

  async findAll(): Promise<IDoctor[]> {
    const doctors = await prisma.doctor.findMany();

    return doctors;
  }

  async findById(id: string): Promise<IDoctor | null> {
    const doctor = await prisma.doctor.findUnique({
      where: {
        userId: id,
      },
    });

    return doctor;
  }
}

import { prisma } from "@commons/infra/prisma/prismaClient";
import { IDoctor } from "@modules/doctors/domain/models/IDoctor";
import { IDoctorMail } from "@modules/doctors/domain/models/IDoctorMail";
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

  async findNameAndEmailById(id: string): Promise<IDoctorMail | null> {
    const doctor = await prisma.doctor.findUnique({
      where: {
        userId: id,
      },
      select: {
        name: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return {
      name: doctor?.name,
      email: doctor?.user?.email,
    } as IDoctorMail;
  }
}

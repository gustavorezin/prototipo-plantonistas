import { prisma } from "@commons/infra/prisma/prismaClient";
import { IHospital } from "@modules/hospitals/domain/models/IHospital";
import { IHospitalMail } from "@modules/hospitals/domain/models/IHospitalMail";
import { IHospitalsRepository } from "@modules/hospitals/domain/repositories/IHospitalsRepository";

export class HospitalsRepository implements IHospitalsRepository {
  async findAll(): Promise<IHospital[]> {
    const hospitals = await prisma.hospital.findMany();
    return hospitals;
  }

  async findById(id: string): Promise<IHospital | null> {
    const hospital = await prisma.hospital.findUnique({
      where: {
        userId: id,
      },
    });
    return hospital;
  }

  async findNameAndEmailById(id: string): Promise<IHospitalMail | null> {
    const hospital = await prisma.hospital.findUnique({
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
      name: hospital?.name,
      email: hospital?.user?.email,
    } as IHospitalMail;
  }
}

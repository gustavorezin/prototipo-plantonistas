import { prisma } from "@commons/infra/prisma/prismaClient";
import { IDoctor } from "@modules/doctors/domain/models/IDoctor";
import { IDoctorMail } from "@modules/doctors/domain/models/IDoctorMail";
import { IDoctorsRepository } from "@modules/doctors/domain/repositories/IDoctorsRepository";

export class DoctorsRepository implements IDoctorsRepository {
  async findByCrm(crm: string): Promise<IDoctor | null> {
    const doctor = await prisma.doctor.findUnique({
      where: {
        crm,
      },
    });

    return doctor;
  }

  async findAll(): Promise<IDoctor[]> {
    const doctors = await prisma.doctor.findMany({
      select: {
        userId: true,
        name: true,
        crm: true,
        phone: true,
        specialties: {
          select: {
            specialty: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      specialties: doctor.specialties.map(
        (specialty) => specialty.specialty.name
      ),
    }));
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

  async findAllHiredByHospitalId(hospitalId: string): Promise<IDoctor[]> {
    const doctors = await prisma.doctor.findMany({
      select: {
        userId: true,
        name: true,
        crm: true,
        phone: true,
        specialties: {
          select: {
            specialty: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        applications: {
          some: {
            job: {
              hospitalId,
            },
            status: "ACCEPTED",
          },
        },
      },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      specialties: doctor.specialties.map(
        (specialty) => specialty.specialty.name
      ),
    }));
  }
}

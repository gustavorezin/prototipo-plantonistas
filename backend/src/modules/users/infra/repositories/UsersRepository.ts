import { prisma } from "@commons/infra/prisma/prismaClient";
import { UserType } from "@prisma/client";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUser } from "@modules/users/domain/models/IUser";

export class UsersRepository implements IUsersRepository {
  async create(data: ICreateUser) {
    return prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: data.password,
          userType: data.userType as UserType,
        },
      });

      if (data.userType === "HOSPITAL") {
        await prisma.hospital.create({
          data: {
            userId: user.id,
            name: data.name,
            address: data.address!,
            phone: data.phone!,
          },
        });
      } else if (data.userType === "DOCTOR") {
        await prisma.doctor.create({
          data: {
            userId: user.id,
            name: data.name,
            crm: data.crm!,
            phone: data.phone!,
          },
        });

        if (data.specialties?.length) {
          await prisma.doctorSpecialty.createMany({
            data: data.specialties.map((specialtyId) => ({
              doctorId: user.id,
              specialtyId,
            })),
            skipDuplicates: true,
          });
        }
      }

      return user;
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        doctor: true,
        hospital: true,
      },
    });

    return user;
  }
}

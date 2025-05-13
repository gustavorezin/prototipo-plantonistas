import { prisma } from "@commons/infra/prisma/prismaClient";
import { UserType } from "@prisma/client";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { IUser } from "@modules/users/domain/models/IUser";
import { IUpdateUser } from "@modules/users/domain/models/IUpdateUser";
import { CreateUserSchema } from "@modules/users/domain/schemas/usersSchemas";

export class UsersRepository implements IUsersRepository {
  async create(data: CreateUserSchema) {
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
          });
        }
      }

      return user;
    });
  }

  async update(data: IUpdateUser) {
    return prisma.$transaction(async (prisma) => {
      const user = await prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          email: data.email,
        },
      });

      if (data.userType === "HOSPITAL") {
        await prisma.hospital.update({
          where: {
            userId: user.id,
          },
          data: {
            name: data.name,
            address: data.address!,
            phone: data.phone!,
          },
        });
      } else if (data.userType === "DOCTOR") {
        await prisma.doctor.update({
          where: {
            userId: user.id,
          },
          data: {
            name: data.name,
            crm: data.crm!,
            phone: data.phone!,
          },
        });

        if (data.userType === "DOCTOR") {
          await prisma.doctorSpecialty.deleteMany({
            where: {
              doctorId: user.id,
            },
          });

          await prisma.doctorSpecialty.createMany({
            data: data.specialties!.map((specialtyId) => ({
              doctorId: user.id,
              specialtyId,
            })),
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

  async findById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        doctor: true,
        hospital: true,
      },
    });

    return user;
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}

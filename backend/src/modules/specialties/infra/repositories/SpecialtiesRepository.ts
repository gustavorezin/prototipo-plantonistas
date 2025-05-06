import { prisma } from "@commons/infra/prisma/prismaClient";
import { ISpecialtiesRepository } from "@modules/specialties/domain/repositories/ISpecialtiesRepository";

export class SpecialtiesRepository implements ISpecialtiesRepository {
  async findAll() {
    const specialties = await prisma.specialty.findMany();
    return specialties;
  }
}

import { prisma } from "@commons/infra/prisma/prismaClient";
import { IApplication } from "@modules/applications/domain/models/IApplication";
import { IApplicationsRepository } from "@modules/applications/domain/repositories/IApplicationsRepository";

export class ApplicationsRepository implements IApplicationsRepository {
  async create(jobId: string, doctorId: string): Promise<IApplication> {
    const application = await prisma.application.create({
      data: {
        jobId,
        doctorId,
      },
    });

    return {
      ...application,
      createdAt: application.createdAt.toISOString(),
      updatedAt: application.updatedAt.toISOString(),
    };
  }

  async findByJobIdAndDoctorId(
    jobId: string,
    doctorId: string
  ): Promise<IApplication | null> {
    const application = await prisma.application.findFirst({
      where: {
        jobId,
        doctorId,
      },
    });

    if (!application) {
      return null;
    }

    return {
      ...application,
      createdAt: application.createdAt.toISOString(),
      updatedAt: application.updatedAt.toISOString(),
    };
  }
}

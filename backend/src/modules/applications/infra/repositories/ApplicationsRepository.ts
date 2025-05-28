import { prisma } from "@commons/infra/prisma/prismaClient";
import { IApplication } from "@modules/applications/domain/models/IApplication";
import { IApplicationWithDoctorInfo } from "@modules/applications/domain/models/IApplicationWithDoctorInfo";
import { IApplicationsRepository } from "@modules/applications/domain/repositories/IApplicationsRepository";

export class ApplicationsRepository implements IApplicationsRepository {
  async create(jobId: string, doctorId: string): Promise<IApplication> {
    const application = await prisma.application.create({
      data: {
        jobId,
        doctorId,
      },
    });

    return application;
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
    return application;
  }

  async findAllByJobId(jobId: string): Promise<IApplicationWithDoctorInfo[]> {
    const applications = await prisma.application.findMany({
      where: {
        jobId,
      },
      include: {
        doctor: {
          select: {
            name: true,
            crm: true,
          },
        },
      },
    });

    return applications;
  }
}

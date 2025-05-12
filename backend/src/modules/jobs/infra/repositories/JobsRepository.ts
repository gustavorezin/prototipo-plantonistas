import { prisma } from "@commons/infra/prisma/prismaClient";
import { ICreateJob } from "@modules/jobs/domain/models/ICreateJob";
import { IJob } from "@modules/jobs/domain/models/IJob";
import { IJobsRepository } from "@modules/jobs/domain/repositories/IJobsRepository";

export class JobsRepository implements IJobsRepository {
  async create(data: ICreateJob): Promise<Omit<IJob, "specialties">> {
    return await prisma.$transaction(async (prisma) => {
      const job = await prisma.job.create({
        data: {
          hospitalId: data.hospitalId,
          title: data.title,
          description: data.description,
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          slots: data.slots,
        },
      });

      await prisma.jobSpecialty.createMany({
        data: data.specialtyIds.map((specialtyId) => ({
          jobId: job.id,
          specialtyId,
        })),
      });

      return {
        ...job,
        date: job.date.toISOString(),
        startTime: job.startTime.toISOString(),
        endTime: job.endTime.toISOString(),
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString(),
      };
    });
  }

  async findAllByHospitalId(hospitalId: string): Promise<IJob[]> {
    const jobs = await prisma.job.findMany({
      where: {
        hospitalId,
      },
      include: {
        specialties: {
          select: {
            specialty: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return jobs.map((job) => ({
      ...job,
      date: job.date.toISOString(),
      startTime: job.startTime.toISOString(),
      endTime: job.endTime.toISOString(),
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
      specialties: job.specialties.map((jobSpecialty) => ({
        id: jobSpecialty.specialty.id,
        name: jobSpecialty.specialty.name,
      })),
    }));
  }
}

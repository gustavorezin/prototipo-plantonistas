import { prisma } from "@commons/infra/prisma/prismaClient";
import { IJob } from "@modules/jobs/domain/models/IJob";
import { CreateJobSchema } from "@modules/jobs/domain/models/schemas/CreateJobSchema";
import { UpdateJobSchema } from "@modules/jobs/domain/models/schemas/UpdateJobSchema";
import { IJobsRepository } from "@modules/jobs/domain/repositories/IJobsRepository";
import { JobStatus } from "prisma/generated/client";

export class JobsRepository implements IJobsRepository {
  async create(data: CreateJobSchema & { hospitalId: string }): Promise<IJob> {
    return await prisma.$transaction(async (prisma) => {
      const job = await prisma.job.create({
        data: {
          hospitalId: data.hospitalId,
          title: data.title,
          description: data.description,
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
        startTime: job.startTime.toISOString(),
        endTime: job.endTime.toISOString(),
      };
    });
  }

  async update(data: UpdateJobSchema): Promise<IJob> {
    return await prisma.$transaction(async (prisma) => {
      const job = await prisma.job.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          startTime: data.startTime,
          endTime: data.endTime,
          slots: data.slots,
          status: data.status,
        },
      });

      await prisma.jobSpecialty.deleteMany({
        where: { jobId: job.id },
      });

      await prisma.jobSpecialty.createMany({
        data: data.specialtyIds.map((specialtyId) => ({
          jobId: job.id,
          specialtyId,
        })),
      });

      return {
        ...job,
        startTime: job.startTime.toISOString(),
        endTime: job.endTime.toISOString(),
      };
    });
  }

  async updateStatus(id: string, status: JobStatus): Promise<IJob> {
    const job = await prisma.job.update({
      where: { id },
      data: { status },
    });

    return {
      ...job,
      startTime: job.startTime.toISOString(),
      endTime: job.endTime.toISOString(),
    };
  }

  async findById(id: string): Promise<IJob | null> {
    const job = await prisma.job.findUnique({
      where: { id },
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

    if (!job) {
      return null;
    }

    return {
      ...job,
      startTime: job.startTime.toISOString(),
      endTime: job.endTime.toISOString(),
      specialties: job.specialties.map((jobSpecialty) => ({
        id: jobSpecialty.specialty.id,
        name: jobSpecialty.specialty.name,
      })),
    };
  }

  async incrementFilledSlots(id: string): Promise<void> {
    await prisma.job.update({
      where: { id },
      data: {
        filledSlots: {
          increment: 1,
        },
      },
    });
  }

  async decrementFilledSlots(id: string): Promise<void> {
    await prisma.job.update({
      where: { id },
      data: {
        filledSlots: {
          decrement: 1,
        },
      },
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
      startTime: job.startTime.toISOString(),
      endTime: job.endTime.toISOString(),
      specialties: job.specialties.map((jobSpecialty) => ({
        id: jobSpecialty.specialty.id,
        name: jobSpecialty.specialty.name,
      })),
    }));
  }

  async findAll(): Promise<IJob[]> {
    const jobs = await prisma.job.findMany({
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
      startTime: job.startTime.toISOString(),
      endTime: job.endTime.toISOString(),
      specialties: job.specialties.map((jobSpecialty) => ({
        id: jobSpecialty.specialty.id,
        name: jobSpecialty.specialty.name,
      })),
    }));
  }

  async delete(id: string): Promise<void> {
    await prisma.job.delete({
      where: { id },
    });
  }
}

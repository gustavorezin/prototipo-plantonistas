import { JobStatus } from "@prisma/client";
import { ISpecialty } from "@modules/specialties/domain/models/ISpecialty";

export interface IJob {
  id: string;
  hospitalId: string;
  title: string;
  description: string | null;
  date: string;
  startTime: string;
  endTime: string;
  slots: number;
  filledSlots: number;
  status: JobStatus;
  specialties: ISpecialty[];
  createdAt: string;
  updatedAt: string;
}

import { JobStatus } from "prisma/generated/client";
import { ISpecialty } from "@modules/specialties/domain/models/ISpecialty";

export interface IJob {
  id: string;
  hospitalId: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  slots: number;
  filledSlots: number;
  status: JobStatus;
  specialties: ISpecialty[];
  createdAt: string;
  updatedAt: string;
}

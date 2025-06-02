import { JobStatus } from "prisma/generated/client";

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
  //specialties: ISpecialty[];
}

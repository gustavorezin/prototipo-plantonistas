import { ISpecialty } from "@modules/specialties/domain/models/ISpecialty";
import { JobStatus } from "./enums/JobStatus";

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
  specialties?: ISpecialty[];
}

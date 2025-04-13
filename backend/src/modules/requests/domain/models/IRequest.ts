import { RequestStatus } from "@prisma/client";

export interface IRequest {
  id: string;
  hospitalId: string;
  doctorId: string;
  status: RequestStatus;
  message?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

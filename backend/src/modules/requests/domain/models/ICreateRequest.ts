import { UserType } from "@prisma/client";

export interface ICreateRequest {
  hospitalId: string;
  doctorId: string;
  sender: UserType;
  message?: string;
}

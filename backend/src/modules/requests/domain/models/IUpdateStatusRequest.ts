import { RequestStatus } from "@prisma/client";

export interface IUpdateStatusRequest {
  id: string;
  status: RequestStatus;
}

import { IRequest } from "../models/IRequest";

export interface IRequestsRepository {
  findByDoctorId(doctorId: string): Promise<IRequest[]>;
}

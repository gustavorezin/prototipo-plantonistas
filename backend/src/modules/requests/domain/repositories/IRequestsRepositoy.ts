import { ICreateRequest } from "../models/ICreateRequest";
import { IRequest } from "../models/IRequest";
import { IRequestWithDoctor } from "../models/IRequestWithDoctor";
import { IRequestWithHospital } from "../models/IRequestWithHospital";

export interface IRequestsRepository {
  create(data: ICreateRequest): Promise<IRequest>;
  findByDoctorId(doctorId: string): Promise<IRequestWithHospital[]>;
  findByHospitalId(hospitalId: string): Promise<IRequestWithDoctor[]>;
  findByDoctorIdAndHospitalId(
    doctorId: string,
    hospitalId: string
  ): Promise<IRequest | null>;
}

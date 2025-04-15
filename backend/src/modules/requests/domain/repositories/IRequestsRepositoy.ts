import { IRequestWithDoctor } from "../models/IRequestWithDoctor";
import { IRequestWithHospital } from "../models/IRequestWithHospital";

export interface IRequestsRepository {
  findByDoctorId(doctorId: string): Promise<IRequestWithHospital[]>;
  findByHospitalId(hospitalId: string): Promise<IRequestWithDoctor[]>;
}

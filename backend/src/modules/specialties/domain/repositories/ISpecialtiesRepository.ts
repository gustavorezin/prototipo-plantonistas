import { ISpecialty } from "../models/ISpecialty";

export interface ISpecialtiesRepository {
  findAll(): Promise<ISpecialty[]>;
  findByDoctorId(doctorId: string): Promise<ISpecialty[]>;
}

import { IHospital } from "../models/IHospital";
import { IHospitalMail } from "../models/IHospitalMail";

export interface IHospitalsRepository {
  findAll(): Promise<IHospital[]>;
  findById(id: string): Promise<IHospital | null>;
  findNameAndEmailById(id: string): Promise<IHospitalMail | null>;
}

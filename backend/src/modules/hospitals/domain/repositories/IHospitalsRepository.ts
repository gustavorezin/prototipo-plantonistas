import { IHospital } from "../models/IHospital";
import { IHospitalMail } from "../models/IHospitalMail";

export interface IHospitalsRepository {
  updateHiringStatus(id: string, hiring: boolean): Promise<void>;
  findAll(): Promise<IHospital[]>;
  findById(id: string): Promise<IHospital | null>;
  findNameAndEmailById(id: string): Promise<IHospitalMail | null>;
}

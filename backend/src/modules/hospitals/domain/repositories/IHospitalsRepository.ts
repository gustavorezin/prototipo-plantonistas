import { IHospital } from "../models/IHospital";

export interface IHospitalsRepository {
  updateHiringStatus(id: string, hiring: boolean): Promise<void>;
  findAll(): Promise<IHospital[]>;
  findById(id: string): Promise<IHospital | null>;
}

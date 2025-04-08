import { IHospital } from "../models/IHospital";

export interface IHospitalsRepository {
  findAll(): Promise<IHospital[]>;
  findById(id: string): Promise<IHospital | null>;
}

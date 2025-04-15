import { IDoctor } from "../models/IDoctor";

export interface IDoctorsRepository {
  updateAvailableStatus(id: string, available: boolean): Promise<void>;
  findByCrm(crm: string): Promise<IDoctor | null>;
  findAll(): Promise<IDoctor[]>;
  findById(id: string): Promise<IDoctor | null>;
}

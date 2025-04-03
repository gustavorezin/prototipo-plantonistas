import { IDoctor } from "../models/IDoctor";

export interface IDoctorsRepository {
  findByCrm(crm: string): Promise<IDoctor | null>;
  findAll(): Promise<IDoctor[]>;
  findById(id: string): Promise<IDoctor | null>;
}

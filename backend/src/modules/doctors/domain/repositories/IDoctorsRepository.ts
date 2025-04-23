import { IDoctor } from "../models/IDoctor";
import { IDoctorMail } from "../models/IDoctorMail";

export interface IDoctorsRepository {
  updateAvailableStatus(id: string, available: boolean): Promise<void>;
  findByCrm(crm: string): Promise<IDoctor | null>;
  findAll(): Promise<IDoctor[]>;
  findById(id: string): Promise<IDoctor | null>;
  findNameAndEmailById(id: string): Promise<IDoctorMail | null>;
}

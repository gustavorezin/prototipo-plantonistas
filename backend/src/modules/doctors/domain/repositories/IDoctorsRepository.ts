import { IDoctor } from "../models/IDoctor";
import { IDoctorMail } from "../models/IDoctorMail";

export interface IDoctorsRepository {
  findByCrm(crm: string): Promise<IDoctor | null>;
  findAll(): Promise<IDoctor[]>;
  findById(id: string): Promise<IDoctor | null>;
  findNameAndEmailById(id: string): Promise<IDoctorMail | null>;
}

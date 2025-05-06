import { ISpecialty } from "@modules/specialties/domain/models/ISpecialty";

export interface IDoctor {
  userId: string;
  name: string;
  crm: string;
  phone: string;
  available: boolean;
}

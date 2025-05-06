import { ISpecialty } from "../models/ISpecialty";

export interface ISpecialtiesRepository {
  findAll(): Promise<ISpecialty[]>;
}

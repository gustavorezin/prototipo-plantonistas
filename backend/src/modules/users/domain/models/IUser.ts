import { IDoctor } from "@modules/doctors/domain/models/IDoctor";
import { IHospital } from "@modules/hospitals/domain/models/IHospital";
import { UserType } from "@prisma/client";

export interface IUser {
  id: string;
  email: string;
  password: string;
  doctor?: IDoctor | null;
  hospital?: IHospital | null;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

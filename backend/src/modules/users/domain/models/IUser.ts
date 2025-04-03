import { UserType } from "@prisma/client";

export interface IUser {
  id: string;
  email: string;
  password: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

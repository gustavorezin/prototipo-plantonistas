import { UserType } from "@prisma/client";

export interface IUpdateUser {
  id: string;
  userType: UserType;
  email: string;
  name: string;
  phone?: string;
  // Campos específicos de Hospital
  address?: string;
  // Campos específicos de Médico
  crm?: string;
  specialties?: string[];
}

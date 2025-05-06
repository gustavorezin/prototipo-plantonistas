export type UserRole = "HOSPITAL" | "DOCTOR";

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  userType: UserRole;
  phone?: string;
  // Campos específicos de Hospital
  address?: string;
  // Campos específicos de Médico
  crm?: string;
  specialties?: string[];
}

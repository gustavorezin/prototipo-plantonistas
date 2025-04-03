export type UserRole = "HOSPITAL" | "DOCTOR";

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  // Campos específicos de Hospital
  address?: string;
  phone?: string;
  // Campos específicos de Médico
  crm?: string;
  specialty?: string;
}

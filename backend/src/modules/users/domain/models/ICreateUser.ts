export type UserRole = "HOSPITAL" | "DOCTOR";

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  // Campos específicos de Hospital
  address?: string;
  // Campos específicos de Médico
  crm?: string;
  specialty?: string;
}

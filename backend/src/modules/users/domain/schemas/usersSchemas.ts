import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  userType: z.enum(["DOCTOR", "HOSPITAL"], {
    message: "Tipo de usuário inválido",
  }),
  address: z.string().min(3, "Endereço deve ter pelo menos 3 caracteres"),
  phone: z.string().regex(/^(\(?\d{2}\)?\s?)?(\d{4,5}\-?\d{4})$/, {
    message: "Telefone inválido",
  }),
  crm: z.string().optional(),
  specialties: z.array(z.string()).optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;

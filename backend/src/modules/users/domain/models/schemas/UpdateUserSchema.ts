import { z } from "zod";

export const updateUserSchema = z
  .object({
    id: z.string().uuid("ID inválido"),
    email: z.string().email({ message: "E-mail inválido" }),
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    userType: z.enum(["DOCTOR", "HOSPITAL"], {
      message: "Tipo de usuário inválido",
    }),
    address: z
      .string()
      .min(3, "Endereço deve ter pelo menos 3 caracteres")
      .optional(),
    phone: z.string().regex(/^(\(?\d{2}\)?\s?)?(\d{4,5}\-?\d{4})$/, {
      message: "Telefone inválido",
    }),
    crm: z.string().optional(),
    specialties: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.userType === "HOSPITAL" && !data.address) {
      ctx.addIssue({
        path: ["address"],
        code: z.ZodIssueCode.custom,
        message: "Hospital deve informar um endereço",
      });
    }

    if (data.userType === "DOCTOR" && !data.crm) {
      ctx.addIssue({
        path: ["crm"],
        code: z.ZodIssueCode.custom,
        message: "Médico deve informar o CRM",
      });
    }
  });

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

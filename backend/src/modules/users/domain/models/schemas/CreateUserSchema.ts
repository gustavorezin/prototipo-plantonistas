import { z } from "zod";

export const createUserSchema = z
  .object({
    email: z.string({ message: "E-mail inválido" }).email(),
    password: z.string().min(6),
    name: z.string().min(3),
    userType: z.enum(["DOCTOR", "HOSPITAL"], {
      message: "Tipo de usuário inválido",
    }),
    address: z.string().optional(),
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

export type CreateUserSchema = z.infer<typeof createUserSchema>;

import { z } from "zod";

export const sendMailToUserSchema = z.object({
  toUserId: z.string().uuid("ID inválido"),
  content: z.string().optional(),
});

export type SendMailToUserSchema = z.infer<typeof sendMailToUserSchema>;

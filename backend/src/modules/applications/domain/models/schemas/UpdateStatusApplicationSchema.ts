import { z } from "zod";

export const updateStatusApplicationSchema = z.object({
  applicationId: z.string().uuid(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]),
});

export type UpdateStatusApplicationSchema = z.infer<
  typeof updateStatusApplicationSchema
>;

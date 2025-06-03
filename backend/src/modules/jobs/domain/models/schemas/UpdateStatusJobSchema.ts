import { z } from "zod";

export const updateStatusJobSchema = z.object({
  jobId: z.string().uuid(),
  status: z.enum(["OPEN", "CLOSED", "CANCELLED", "COMPLETED"]),
});

export type UpdateStatusJobSchema = z.infer<typeof updateStatusJobSchema>;

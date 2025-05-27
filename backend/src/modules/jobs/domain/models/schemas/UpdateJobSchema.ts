import { JobStatus } from "prisma/generated/client";
import { z } from "zod";

export const updateJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  slots: z.number().min(1),
  specialtyIds: z.array(z.string()),
  status: z.enum(["OPEN", "CLOSED", "CANCELLED", "COMPLETED"]).default("OPEN"),
  id: z.string().uuid(),
});

export type UpdateJobSchema = z.infer<typeof updateJobSchema>;

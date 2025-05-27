import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  slots: z.number().min(1),
  specialtyIds: z.array(z.string()),
  hospitalId: z.string(),
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;

export const JobStatus = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

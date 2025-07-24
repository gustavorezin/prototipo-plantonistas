export const UserType = {
  HOSPITAL: "HOSPITAL",
  DOCTOR: "DOCTOR",
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

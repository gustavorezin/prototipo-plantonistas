import { PrismaClient } from "../../../generated/prisma/client";

export const prisma = new PrismaClient({
  omit: {
    application: {
      createdAt: true,
      updatedAt: true,
    },
    job: {
      createdAt: true,
      updatedAt: true,
    },
    user: {
      createdAt: true,
      updatedAt: true,
      password: true,
    },
  },
});

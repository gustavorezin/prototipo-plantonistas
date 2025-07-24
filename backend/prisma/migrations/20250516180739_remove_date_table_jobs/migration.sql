/*
  Warnings:

  - You are about to drop the column `date` on the `jobs` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_jobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hospitalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "slots" INTEGER NOT NULL,
    "filledSlots" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "jobs_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_jobs" ("createdAt", "description", "endTime", "filledSlots", "hospitalId", "id", "slots", "startTime", "status", "title", "updatedAt") SELECT "createdAt", "description", "endTime", "filledSlots", "hospitalId", "id", "slots", "startTime", "status", "title", "updatedAt" FROM "jobs";
DROP TABLE "jobs";
ALTER TABLE "new_jobs" RENAME TO "jobs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the column `available` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `hiring` on the `hospitals` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_doctors" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    CONSTRAINT "doctors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_doctors" ("crm", "name", "phone", "userId") SELECT "crm", "name", "phone", "userId" FROM "doctors";
DROP TABLE "doctors";
ALTER TABLE "new_doctors" RENAME TO "doctors";
CREATE UNIQUE INDEX "doctors_crm_key" ON "doctors"("crm");
CREATE TABLE "new_hospitals" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    CONSTRAINT "hospitals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_hospitals" ("address", "name", "phone", "userId") SELECT "address", "name", "phone", "userId" FROM "hospitals";
DROP TABLE "hospitals";
ALTER TABLE "new_hospitals" RENAME TO "hospitals";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

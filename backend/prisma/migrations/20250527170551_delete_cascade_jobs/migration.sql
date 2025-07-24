-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_job_specialties" (
    "jobId" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,

    PRIMARY KEY ("jobId", "specialtyId"),
    CONSTRAINT "job_specialties_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "job_specialties_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_job_specialties" ("jobId", "specialtyId") SELECT "jobId", "specialtyId" FROM "job_specialties";
DROP TABLE "job_specialties";
ALTER TABLE "new_job_specialties" RENAME TO "job_specialties";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

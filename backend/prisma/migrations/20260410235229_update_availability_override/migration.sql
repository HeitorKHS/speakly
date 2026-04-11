/*
  Warnings:

  - Added the required column `type` to the `AvailabilityOverride` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AvailabilityOverride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "startTime" TEXT,
    "allDayBlock" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL,
    "teacherProfileId" TEXT NOT NULL,
    CONSTRAINT "AvailabilityOverride_teacherProfileId_fkey" FOREIGN KEY ("teacherProfileId") REFERENCES "TeacherProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AvailabilityOverride" ("date", "id", "startTime", "teacherProfileId") SELECT "date", "id", "startTime", "teacherProfileId" FROM "AvailabilityOverride";
DROP TABLE "AvailabilityOverride";
ALTER TABLE "new_AvailabilityOverride" RENAME TO "AvailabilityOverride";
CREATE UNIQUE INDEX "AvailabilityOverride_teacherProfileId_date_startTime_key" ON "AvailabilityOverride"("teacherProfileId", "date", "startTime");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

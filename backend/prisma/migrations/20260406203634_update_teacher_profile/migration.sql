/*
  Warnings:

  - Made the column `bio` on table `TeacherProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `TeacherProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TeacherProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bio" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "avatarUrl" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TeacherProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TeacherProfile" ("avatarUrl", "bio", "description", "id", "price", "userId") SELECT "avatarUrl", "bio", "description", "id", "price", "userId" FROM "TeacherProfile";
DROP TABLE "TeacherProfile";
ALTER TABLE "new_TeacherProfile" RENAME TO "TeacherProfile";
CREATE UNIQUE INDEX "TeacherProfile_userId_key" ON "TeacherProfile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

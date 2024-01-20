/*
  Warnings:

  - Changed the type of `institutionUuid` on the `institution` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "institution" DROP COLUMN "institutionUuid",
ADD COLUMN     "institutionUuid" INTEGER NOT NULL;

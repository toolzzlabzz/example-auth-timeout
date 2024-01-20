/*
  Warnings:

  - You are about to drop the column `institutionUuid` on the `institution` table. All the data in the column will be lost.
  - Added the required column `institutionToolzzId` to the `institution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institution" DROP COLUMN "institutionUuid",
ADD COLUMN     "institutionToolzzId" INTEGER NOT NULL;

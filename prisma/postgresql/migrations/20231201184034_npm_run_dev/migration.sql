/*
  Warnings:

  - The primary key for the `bot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `standartdatasetId` on the `bot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bot" DROP CONSTRAINT "bot_pkey",
DROP COLUMN "standartdatasetId",
ADD CONSTRAINT "bot_pkey" PRIMARY KEY ("id", "creatorId", "institutionId", "unityId");

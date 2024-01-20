/*
  Warnings:

  - You are about to drop the column `botCreativePrecision` on the `bot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bot" DROP CONSTRAINT "bot_unityId_fkey";

-- AlterTable
ALTER TABLE "bot" DROP COLUMN "botCreativePrecision",
ADD COLUMN     "creativePrecision" INTEGER NOT NULL DEFAULT 2,
ALTER COLUMN "unityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "genAI" ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "bot_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

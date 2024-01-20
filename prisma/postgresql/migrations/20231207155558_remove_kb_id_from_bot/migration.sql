/*
  Warnings:

  - You are about to drop the column `modelId` on the `bot` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "fk_bot_knowledgebase_idx";

-- AlterTable
ALTER TABLE "bot" DROP COLUMN "modelId";

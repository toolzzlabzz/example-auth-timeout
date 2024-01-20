/*
  Warnings:

  - You are about to drop the column `mask_name` on the `knowledgebasefile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "knowledgebasefile" DROP COLUMN "mask_name",
ADD COLUMN     "maskName" TEXT;

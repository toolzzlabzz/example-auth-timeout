/*
  Warnings:

  - You are about to alter the column `name` on the `genAI` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE "genAI" ADD COLUMN     "hasAssistant" BOOLEAN DEFAULT false,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(150);

/*
  Warnings:

  - Added the required column `assistantId` to the `botGenAI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "botGenAI" ADD COLUMN     "assistantId" VARCHAR(255) NOT NULL;

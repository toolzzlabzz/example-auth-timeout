/*
  Warnings:

  - You are about to drop the column `kbFolderDescription` on the `knowledgebasefile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "knowledgebasefile" DROP COLUMN "kbFolderDescription",
ADD COLUMN     "url" TEXT;

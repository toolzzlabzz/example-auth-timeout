/*
  Warnings:

  - The primary key for the `kbFolder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kbFolderId` on the `knowledgebase` table. All the data in the column will be lost.
  - Added the required column `knowLedgeBaseId` to the `kbFolder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "kbFolder" DROP CONSTRAINT "kbFolder_institutionId_fkey";

-- DropForeignKey
ALTER TABLE "knowledgebase" DROP CONSTRAINT "knowledgebase_kbFolderId_fkey";

-- DropIndex
DROP INDEX "fk_kbfolder_institutions1_idx";

-- AlterTable
ALTER TABLE "kbFolder" DROP CONSTRAINT "kbFolder_pkey",
ADD COLUMN     "knowLedgeBaseId" UUID NOT NULL,
ALTER COLUMN "institutionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "knowledgebase" DROP COLUMN "kbFolderId";

-- AddForeignKey
ALTER TABLE "kbFolder" ADD CONSTRAINT "kbFolder_knowLedgeBaseId_fkey" FOREIGN KEY ("knowLedgeBaseId") REFERENCES "knowledgebase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kbFolder" ADD CONSTRAINT "kbFolder_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

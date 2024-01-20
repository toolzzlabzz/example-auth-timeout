-- AlterTable
ALTER TABLE "knowledgebase" ADD COLUMN     "kbFolderId" UUID;

-- AddForeignKey
ALTER TABLE "knowledgebase" ADD CONSTRAINT "knowledgebase_kbFolderId_fkey" FOREIGN KEY ("kbFolderId") REFERENCES "kbFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

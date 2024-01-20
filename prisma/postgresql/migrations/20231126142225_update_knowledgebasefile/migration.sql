-- AlterTable
ALTER TABLE "knowledgebasefile" ADD COLUMN     "kbFolderId" UUID;

-- CreateIndex
CREATE INDEX "fk_knowledge_base_file_kb_folder_idx" ON "knowledgebasefile"("kbFolderId");

-- AddForeignKey
ALTER TABLE "knowledgebasefile" ADD CONSTRAINT "knowledgebasefile_kbFolderId_fkey" FOREIGN KEY ("kbFolderId") REFERENCES "kbFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

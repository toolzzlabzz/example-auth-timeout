-- DropForeignKey
ALTER TABLE "kbFolder" DROP CONSTRAINT "kbFolder_knowLedgeBaseId_fkey";

-- DropForeignKey
ALTER TABLE "knowledgebase" DROP CONSTRAINT "fk_knowledge_base_unity1";

-- DropForeignKey
ALTER TABLE "knowledgebaseFile" DROP CONSTRAINT "knowledgebaseFile_kbFolderId_fkey";

-- AddForeignKey
ALTER TABLE "knowledgebase" ADD CONSTRAINT "fk_knowledge_base_unity1" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "kbFolder" ADD CONSTRAINT "fk_knowledge_base_kbfolder1" FOREIGN KEY ("knowLedgeBaseId") REFERENCES "knowledgebase"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "knowledgebaseFile" ADD CONSTRAINT "fk_knowledge_base_kbfolder1" FOREIGN KEY ("kbFolderId") REFERENCES "kbFolder"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

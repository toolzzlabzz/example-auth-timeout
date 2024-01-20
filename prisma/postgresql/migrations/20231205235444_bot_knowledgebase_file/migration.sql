/*
  Warnings:

  - You are about to drop the `bot_knowledgebase_file` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bot_knowledgebase_file" DROP CONSTRAINT "bot_knowledgebase_file_botId_fkey";

-- DropForeignKey
ALTER TABLE "bot_knowledgebase_file" DROP CONSTRAINT "bot_knowledgebase_file_knowLedgeBaseId_fkey";

-- DropForeignKey
ALTER TABLE "bot_knowledgebase_file" DROP CONSTRAINT "bot_knowledgebase_file_knowledgebaseFileId_fkey";

-- DropTable
DROP TABLE "bot_knowledgebase_file";

-- CreateTable
CREATE TABLE "botKnowledgebaseFile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botId" UUID NOT NULL,
    "knowledgebaseFileId" UUID NOT NULL,
    "knowLedgeBaseId" UUID,

    CONSTRAINT "botKnowledgebaseFile_pkey" PRIMARY KEY ("botId","knowledgebaseFileId")
);

-- CreateIndex
CREATE UNIQUE INDEX "botKnowledgebaseFile_id_key" ON "botKnowledgebaseFile"("id");

-- AddForeignKey
ALTER TABLE "botKnowledgebaseFile" ADD CONSTRAINT "botKnowledgebaseFile_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "botKnowledgebaseFile" ADD CONSTRAINT "botKnowledgebaseFile_knowledgebaseFileId_fkey" FOREIGN KEY ("knowledgebaseFileId") REFERENCES "knowledgebaseFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "botKnowledgebaseFile" ADD CONSTRAINT "botKnowledgebaseFile_knowLedgeBaseId_fkey" FOREIGN KEY ("knowLedgeBaseId") REFERENCES "knowledgebase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

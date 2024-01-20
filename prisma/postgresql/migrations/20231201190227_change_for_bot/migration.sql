/*
  Warnings:

  - The primary key for the `bot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `knowledgebasefile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `folderCreatorId` on the `knowledgebasefile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bot" DROP CONSTRAINT "fk_bot_created_institutions1";

-- DropForeignKey
ALTER TABLE "bot" DROP CONSTRAINT "fk_bot_created_knowledge_base1";

-- DropForeignKey
ALTER TABLE "bot" DROP CONSTRAINT "fk_bot_created_unity1";

-- DropForeignKey
ALTER TABLE "bot" DROP CONSTRAINT "fk_bot_created_users_admins1";

-- DropForeignKey
ALTER TABLE "knowledgebasefile" DROP CONSTRAINT "fk_knowledge_base_folder_knowledge_base1";

-- AlterTable
ALTER TABLE "bot" DROP CONSTRAINT "bot_pkey",
ADD COLUMN     "llmKey" VARCHAR(255),
ADD COLUMN     "llmOrganization" VARCHAR(255),
ADD COLUMN     "modelId" UUID,
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "knowLedgeBaseId" DROP NOT NULL,
ADD CONSTRAINT "bot_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "knowledgebasefile" DROP CONSTRAINT "knowledgebasefile_pkey",
DROP COLUMN "folderCreatorId",
ALTER COLUMN "knowLedgeBaseId" DROP NOT NULL,
ADD CONSTRAINT "knowledgebasefile_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "bot_knowledgebase_file" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botId" UUID NOT NULL,
    "knowledgebaseFileId" UUID NOT NULL,
    "knowLedgeBaseId" UUID,

    CONSTRAINT "bot_knowledgebase_file_pkey" PRIMARY KEY ("botId","knowledgebaseFileId")
);

-- CreateIndex
CREATE UNIQUE INDEX "bot_knowledgebase_file_id_key" ON "bot_knowledgebase_file"("id");

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "bot_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "bot_knowLedgeBaseId_fkey" FOREIGN KEY ("knowLedgeBaseId") REFERENCES "knowledgebase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "bot_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "bot_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot_knowledgebase_file" ADD CONSTRAINT "bot_knowledgebase_file_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot_knowledgebase_file" ADD CONSTRAINT "bot_knowledgebase_file_knowledgebaseFileId_fkey" FOREIGN KEY ("knowledgebaseFileId") REFERENCES "knowledgebasefile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot_knowledgebase_file" ADD CONSTRAINT "bot_knowledgebase_file_knowLedgeBaseId_fkey" FOREIGN KEY ("knowLedgeBaseId") REFERENCES "knowledgebase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledgebasefile" ADD CONSTRAINT "knowledgebasefile_knowLedgeBaseId_fkey" FOREIGN KEY ("knowLedgeBaseId") REFERENCES "knowledgebase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "fk_bot_created_institutions1_idx" RENAME TO "fk_bot_institution_idx";

-- RenameIndex
ALTER INDEX "fk_bot_created_knowledge_base1_idx" RENAME TO "fk_bot_knowledgebase_idx";

-- RenameIndex
ALTER INDEX "fk_bot_created_unity1_idx" RENAME TO "fk_bot_unity_idx";

-- RenameIndex
ALTER INDEX "fk_bot_created_users_admins1_idx" RENAME TO "fk_bot_creator_idx";

-- RenameIndex
ALTER INDEX "fk_knowledge_base_file_kb_folder_idx" RENAME TO "fk_knowledgebasefile_kbfolder_idx";

-- RenameIndex
ALTER INDEX "fk_knowledge_base_folder_knowledge_base1_idx" RENAME TO "fk_knowledgebasefile_knowledgebase_idx";

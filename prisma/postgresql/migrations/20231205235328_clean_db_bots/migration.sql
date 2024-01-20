/*
  Warnings:

  - You are about to drop the column `botHumourUuid` on the `bot` table. All the data in the column will be lost.
  - You are about to drop the column `botMainFunction` on the `bot` table. All the data in the column will be lost.
  - You are about to drop the column `botSecundarySkills` on the `bot` table. All the data in the column will be lost.
  - You are about to drop the column `llmKey` on the `bot` table. All the data in the column will be lost.
  - You are about to drop the column `llmOrganization` on the `bot` table. All the data in the column will be lost.
  - You are about to drop the column `kbContentSourceId` on the `knowledgebase` table. All the data in the column will be lost.
  - You are about to drop the column `kbFilesStorageId` on the `knowledgebase` table. All the data in the column will be lost.
  - You are about to drop the `knowledgebasefile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bot_knowledgebase_file" DROP CONSTRAINT "bot_knowledgebase_file_knowledgebaseFileId_fkey";

-- DropForeignKey
ALTER TABLE "kbfoldercontentrelation" DROP CONSTRAINT "fk_kb_folder_content_relation_knowledge_base_folder1";

-- DropForeignKey
ALTER TABLE "knowledgebasefile" DROP CONSTRAINT "knowledgebasefile_kbFolderId_fkey";

-- DropForeignKey
ALTER TABLE "knowledgebasefile" DROP CONSTRAINT "knowledgebasefile_knowLedgeBaseId_fkey";

-- DropForeignKey
ALTER TABLE "standartdataset" DROP CONSTRAINT "fk_standartdatabase_baseModel1";

-- AlterTable
ALTER TABLE "bot" DROP COLUMN "botHumourUuid",
DROP COLUMN "botMainFunction",
DROP COLUMN "botSecundarySkills",
DROP COLUMN "llmKey",
DROP COLUMN "llmOrganization",
ALTER COLUMN "botIconImg" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "knowledgebase" DROP COLUMN "kbContentSourceId",
DROP COLUMN "kbFilesStorageId";

-- AlterTable
ALTER TABLE "standartdataset" ADD COLUMN     "botModelId" UUID,
ADD COLUMN     "genAIModelId" UUID;

-- DropTable
DROP TABLE "knowledgebasefile";

-- CreateTable
CREATE TABLE "botGenAI" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botId" UUID NOT NULL,
    "genAIId" UUID NOT NULL,
    "genAIKey" VARCHAR(255) NOT NULL,
    "genAIOrganization" VARCHAR(255) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "botFolder" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botId" UUID NOT NULL,
    "folderId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "genAIModel" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "genAIId" UUID NOT NULL,
    "name" VARCHAR(45)
);

-- CreateTable
CREATE TABLE "genAI" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "knowledgebaseFile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "institutionId" UUID,
    "fileName" VARCHAR(45),
    "internalStorageUrl" VARCHAR(255),
    "url" TEXT,
    "maskName" TEXT,
    "knowLedgeBaseId" UUID,
    "kbFolderId" UUID,

    CONSTRAINT "knowledgebaseFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "botGenAI_id_key" ON "botGenAI"("id");

-- CreateIndex
CREATE UNIQUE INDEX "botFolder_id_key" ON "botFolder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "genAIModel_id_key" ON "genAIModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "genAI_id_key" ON "genAI"("id");

-- CreateIndex
CREATE UNIQUE INDEX "knowledgebaseFile_id_key" ON "knowledgebaseFile"("id");

-- CreateIndex
CREATE INDEX "fk_knowledgebasefile_knowledgebase_idx" ON "knowledgebaseFile"("knowLedgeBaseId");

-- CreateIndex
CREATE INDEX "fk_knowledgebasefile_kbfolder_idx" ON "knowledgebaseFile"("kbFolderId");

-- AddForeignKey
ALTER TABLE "botGenAI" ADD CONSTRAINT "fk_file_bot1" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "botGenAI" ADD CONSTRAINT "fk_file_geAI1" FOREIGN KEY ("genAIId") REFERENCES "genAI"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "botFolder" ADD CONSTRAINT "fk_bot_folder1" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "botFolder" ADD CONSTRAINT "fk_folder_bot1" FOREIGN KEY ("folderId") REFERENCES "kbFolder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "genAIModel" ADD CONSTRAINT "fk_genAI_model1" FOREIGN KEY ("genAIId") REFERENCES "genAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledgebaseFile" ADD CONSTRAINT "knowledgebaseFile_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledgebaseFile" ADD CONSTRAINT "knowledgebaseFile_knowLedgeBaseId_fkey" FOREIGN KEY ("knowLedgeBaseId") REFERENCES "knowledgebase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledgebaseFile" ADD CONSTRAINT "knowledgebaseFile_kbFolderId_fkey" FOREIGN KEY ("kbFolderId") REFERENCES "kbFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standartdataset" ADD CONSTRAINT "standartdataset_genAIModelId_fkey" FOREIGN KEY ("genAIModelId") REFERENCES "genAIModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standartdataset" ADD CONSTRAINT "standartdataset_botModelId_fkey" FOREIGN KEY ("botModelId") REFERENCES "botmodel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kbfoldercontentrelation" ADD CONSTRAINT "fk_kb_folder_content_relation_knowledge_base_folder1" FOREIGN KEY ("kbFolderId") REFERENCES "knowledgebaseFile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bot_knowledgebase_file" ADD CONSTRAINT "bot_knowledgebase_file_knowledgebaseFileId_fkey" FOREIGN KEY ("knowledgebaseFileId") REFERENCES "knowledgebaseFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

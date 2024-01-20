/*
  Warnings:

  - You are about to drop the `botCognitiveService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cognitiveService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "botCognitiveService" DROP CONSTRAINT "fk_Bot_CognitiveService";

-- DropForeignKey
ALTER TABLE "botCognitiveService" DROP CONSTRAINT "fk_CognitiveService_Bot";

-- DropTable
DROP TABLE "botCognitiveService";

-- DropTable
DROP TABLE "cognitiveService";

-- CreateTable
CREATE TABLE "botVectorStore" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botId" UUID NOT NULL,
    "vectorStoreId" UUID NOT NULL,
    "userKey" VARCHAR(255) NOT NULL,
    "adminKey" VARCHAR(255) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "vectorStore" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "botVectorStore_id_key" ON "botVectorStore"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vectorStore_id_key" ON "vectorStore"("id");

-- AddForeignKey
ALTER TABLE "botVectorStore" ADD CONSTRAINT "fk_VectorStore_Bot" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "botVectorStore" ADD CONSTRAINT "fk_Bot_VectorStore" FOREIGN KEY ("vectorStoreId") REFERENCES "vectorStore"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

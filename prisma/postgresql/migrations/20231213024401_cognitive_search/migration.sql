-- CreateTable
CREATE TABLE "botCognitiveService" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botId" UUID NOT NULL,
    "cognitiveSearchId" UUID NOT NULL,
    "userKey" VARCHAR(255) NOT NULL,
    "adminKey" VARCHAR(255) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "cognitiveService" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "botCognitiveService_id_key" ON "botCognitiveService"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cognitiveService_id_key" ON "cognitiveService"("id");

-- AddForeignKey
ALTER TABLE "botCognitiveService" ADD CONSTRAINT "fk_CognitiveService_Bot" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "botCognitiveService" ADD CONSTRAINT "fk_Bot_CognitiveService" FOREIGN KEY ("cognitiveSearchId") REFERENCES "cognitiveService"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- DropForeignKey
ALTER TABLE "bot" DROP CONSTRAINT "fk_bot_created_bot_advconfig1";

-- DropIndex
DROP INDEX "fk_bot_created_bot_advconfig1_idx";

-- AlterTable
ALTER TABLE "standartdataset" ALTER COLUMN "BaseBotModelId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "bot_botAdvConfigId_fkey" FOREIGN KEY ("botAdvConfigId") REFERENCES "botAdvConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

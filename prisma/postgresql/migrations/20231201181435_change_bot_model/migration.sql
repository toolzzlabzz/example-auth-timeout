/*
  Warnings:

  - You are about to drop the column `botAdvConfigId` on the `bot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "aiprompts" DROP CONSTRAINT "fk_ai_prompts_bot_created1";

-- DropForeignKey
ALTER TABLE "bot" DROP CONSTRAINT "bot_botAdvConfigId_fkey";

-- DropForeignKey
ALTER TABLE "bot" DROP CONSTRAINT "fk_bot_created_standartdataset1";

-- DropForeignKey
ALTER TABLE "kbcontentsourcessettings" DROP CONSTRAINT "fk_kb_content_sources_settings_bot_created1";

-- DropIndex
DROP INDEX "fk_bot_created_standartdataset1_idx";

-- AlterTable
ALTER TABLE "bot" DROP COLUMN "botAdvConfigId",
ADD COLUMN     "prompt" TEXT;

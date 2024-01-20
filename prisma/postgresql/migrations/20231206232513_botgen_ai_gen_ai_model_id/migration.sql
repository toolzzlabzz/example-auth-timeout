/*
  Warnings:

  - Added the required column `genAIModelId` to the `botGenAI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "botGenAI" ADD COLUMN     "genAIModelId" UUID NOT NULL;

-- RenameForeignKey
ALTER TABLE "botGenAI" RENAME CONSTRAINT "fk_file_bot1" TO "fk_botgenAI_bot1";

-- RenameForeignKey
ALTER TABLE "botGenAI" RENAME CONSTRAINT "fk_file_geAI1" TO "fk_botgenAI_geAI1";

-- AddForeignKey
ALTER TABLE "botGenAI" ADD CONSTRAINT "fk_botgenAI_genAIModel1" FOREIGN KEY ("genAIModelId") REFERENCES "genAIModel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

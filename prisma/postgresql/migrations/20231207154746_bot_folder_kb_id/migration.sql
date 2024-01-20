/*
  Warnings:

  - Added the required column `kbId` to the `botFolder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "botFolder" ADD COLUMN     "kbId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "botFolder" ADD CONSTRAINT "fk_bot_folder_kb1" FOREIGN KEY ("kbId") REFERENCES "knowledgebase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

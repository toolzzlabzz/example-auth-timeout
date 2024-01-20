-- DropForeignKey
ALTER TABLE "botFolder" DROP CONSTRAINT "fk_bot_folder1";

-- DropForeignKey
ALTER TABLE "botFolder" DROP CONSTRAINT "fk_folder_bot1";

-- DropForeignKey
ALTER TABLE "botGenAI" DROP CONSTRAINT "fk_botgenAI_bot1";

-- AddForeignKey
ALTER TABLE "botGenAI" ADD CONSTRAINT "fk_botgenAI_bot1" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "botFolder" ADD CONSTRAINT "fk_bot_folder1" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "botFolder" ADD CONSTRAINT "fk_folder_bot1" FOREIGN KEY ("folderId") REFERENCES "kbFolder"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

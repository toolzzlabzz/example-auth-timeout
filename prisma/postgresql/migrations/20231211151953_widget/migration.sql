-- CreateTable
CREATE TABLE "widget" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "botId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "headerIcon" TEXT NOT NULL,
    "headerColor" TEXT NOT NULL,
    "widgetIcon" TEXT NOT NULL,
    "widgetColor" TEXT NOT NULL,
    "avatarIcon" TEXT NOT NULL,
    "avatarColor" TEXT NOT NULL,
    "aiFirstMessage" TEXT NOT NULL,
    "aiMessageColor" TEXT NOT NULL,
    "userMessageColor" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "widget_id_key" ON "widget"("id");

-- AddForeignKey
ALTER TABLE "widget" ADD CONSTRAINT "fk_widget_bot1" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

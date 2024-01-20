/*
  Warnings:

  - You are about to alter the column `title` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `subTitle` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `headerIcon` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `headerColor` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `widgetIcon` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `widgetColor` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `avatarIcon` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `avatarColor` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `aiFirstMessage` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `aiMessageColor` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `userMessageColor` on the `widget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "widget" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "subTitle" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "headerIcon" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "headerColor" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "widgetIcon" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "widgetColor" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "avatarIcon" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "avatarColor" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "aiFirstMessage" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "aiMessageColor" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "userMessageColor" SET DATA TYPE VARCHAR(20);

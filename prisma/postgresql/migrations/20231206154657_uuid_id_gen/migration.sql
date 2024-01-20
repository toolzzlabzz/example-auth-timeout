/*
  Warnings:

  - You are about to drop the column `botDescription` on the `bot` table. All the data in the column will be lost.
  - You are about to drop the column `botIconImg` on the `bot` table. All the data in the column will be lost.
  - You are about to drop the column `botName` on the `bot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bot" DROP COLUMN "botDescription",
DROP COLUMN "botIconImg",
DROP COLUMN "botName",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "iconImg" VARCHAR(500),
ADD COLUMN     "name" VARCHAR(45);

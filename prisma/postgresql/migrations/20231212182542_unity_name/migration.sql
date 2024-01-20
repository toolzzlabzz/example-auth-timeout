/*
  Warnings:

  - You are about to drop the column `aiDefaultModel` on the `unity` table. All the data in the column will be lost.
  - You are about to drop the column `chatStyle` on the `unity` table. All the data in the column will be lost.
  - You are about to drop the column `darkModeAltLogoUrl` on the `unity` table. All the data in the column will be lost.
  - You are about to drop the column `darkModeLogoUrl` on the `unity` table. All the data in the column will be lost.
  - You are about to drop the column `lightModeAltLogoUrl` on the `unity` table. All the data in the column will be lost.
  - You are about to drop the column `lightModeLogoUrl` on the `unity` table. All the data in the column will be lost.
  - You are about to drop the column `primaryColorHex` on the `unity` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryColorHex` on the `unity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "unity" DROP COLUMN "aiDefaultModel",
DROP COLUMN "chatStyle",
DROP COLUMN "darkModeAltLogoUrl",
DROP COLUMN "darkModeLogoUrl",
DROP COLUMN "lightModeAltLogoUrl",
DROP COLUMN "lightModeLogoUrl",
DROP COLUMN "primaryColorHex",
DROP COLUMN "secondaryColorHex",
ADD COLUMN     "name" VARCHAR(45);

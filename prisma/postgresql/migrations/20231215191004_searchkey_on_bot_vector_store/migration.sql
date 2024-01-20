/*
  Warnings:

  - You are about to drop the column `userKey` on the `botVectorStore` table. All the data in the column will be lost.
  - Added the required column `searchKey` to the `botVectorStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "botVectorStore" DROP COLUMN "userKey",
ADD COLUMN     "searchKey" VARCHAR(255) NOT NULL;

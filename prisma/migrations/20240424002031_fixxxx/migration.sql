/*
  Warnings:

  - You are about to drop the column `isLike` on the `threads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "threads" DROP COLUMN "isLike",
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false;

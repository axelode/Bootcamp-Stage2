/*
  Warnings:

  - You are about to drop the column `updated_ad` on the `replies` table. All the data in the column will be lost.
  - You are about to drop the column `photo_profile` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `replies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "replies" DROP COLUMN "updated_ad",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "photo_profile",
ADD COLUMN     "profile_picture" TEXT NOT NULL;

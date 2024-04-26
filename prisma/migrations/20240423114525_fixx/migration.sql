/*
  Warnings:

  - You are about to drop the `following` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_following_id_fkey";

-- DropTable
DROP TABLE "following";

-- CreateTable
CREATE TABLE "follow" (
    "id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL,
    "followed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

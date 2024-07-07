/*
  Warnings:

  - You are about to drop the `followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_followerId_fkey";

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_userId_fkey";

-- DropTable
DROP TABLE "followers";

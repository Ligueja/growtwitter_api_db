/*
  Warnings:

  - Added the required column `updated_at` to the `tweets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tweets" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

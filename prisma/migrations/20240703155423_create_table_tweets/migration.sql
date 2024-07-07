-- CreateEnum
CREATE TYPE "TweetType" AS ENUM ('TWEET', 'REPLY');

-- CreateTable
CREATE TABLE "tweets" (
    "id" UUID NOT NULL,
    "content" VARCHAR(280) NOT NULL,
    "type" "TweetType" NOT NULL DEFAULT 'TWEET',
    "userId" UUID NOT NULL,

    CONSTRAINT "tweets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

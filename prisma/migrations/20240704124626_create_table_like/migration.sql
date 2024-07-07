-- CreateTable
CREATE TABLE "likes" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tweetId" UUID NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

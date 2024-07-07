-- CreateTable
CREATE TABLE "replys" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tweetId" UUID NOT NULL,

    CONSTRAINT "replys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "replys" ADD CONSTRAINT "replys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replys" ADD CONSTRAINT "replys_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

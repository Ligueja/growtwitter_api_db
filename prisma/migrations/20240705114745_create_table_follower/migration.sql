-- CreateTable
CREATE TABLE "followers" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "followerId" UUID NOT NULL,

    CONSTRAINT "followers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

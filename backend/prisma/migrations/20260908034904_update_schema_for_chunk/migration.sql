-- CreateTable
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE "QueryChunk" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "embedding" vector(768) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QueryChunk_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QueryChunk" ADD CONSTRAINT "QueryChunk_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { prisma } from "../../config/db/db";
import { randomUUID } from "node:crypto";

// Create a QueryChunk with its embedding

/**
 * Inserts a query chunk and its 768-dimension vector embedding into pgvector using raw SQL.
 */
export const createVector = async (
  userId: string,
  content: string,
  chunkIndex: number,
  embedding: number[]
) => {
  const id = randomUUID();
  const vectorStr = `[${embedding.join(",")}]`;

  await prisma.$executeRaw`
    INSERT INTO "QueryChunk" (
      "id",
      "userId",
      "content",
      "chunkIndex",
      "embedding"
    )
    VALUES (
      ${id},
      ${userId},
      ${content},
      ${chunkIndex},
      ${vectorStr}::vector
    );
  `;
};

// Get all chunks of a user

/**
 * Retrieves all vector chunks belonging to a user ordered by chunk index.
 */
export const getVectorsByUserId = async (userId: string) => {
  const result = await prisma.$queryRaw`
    SELECT "id", "userId", "content", "chunkIndex", "createdAt"
    FROM "QueryChunk"
    WHERE "userId" = ${userId}
    ORDER BY "chunkIndex" ASC;
  `;

  return result;
};

// Backward-compatible alias
export const getVectorsByDocumentId = getVectorsByUserId;

// Find similar chunks

/**
 * Performs cosine distance similarity search (<=>) in pgvector for the top matching query chunks for a user.
 */
export const searchSimilarVectors = async (
  embedding: number[],
  userId: string,
  limit: number = 5
) => {
  const vectorStr = `[${embedding.join(",")}]`;
  return await prisma.$queryRaw`
    SELECT "id", "userId", "content", "chunkIndex", "createdAt",
           "embedding" <=> ${vectorStr}::vector AS distance
    FROM "QueryChunk"
    WHERE "userId" = ${userId}
    ORDER BY distance ASC
    LIMIT ${limit};
  `;
};

// Update embedding of a chunk

/**
 * Updates the vector embedding of an existing query chunk.
 */
export const updateVector = async (
  chunkId: string,
  embedding: number[]
) => {
  const vectorStr = `[${embedding.join(",")}]`;
  await prisma.$executeRaw`
    UPDATE "QueryChunk"
    SET "embedding" = ${vectorStr}::vector
    WHERE "id" = ${chunkId};
  `;
};

// Delete chunks of a user

/**
 * Deletes all vector chunks associated with a user ID.
 */
export const deleteVectorsByUserId = async (userId: string) => {
  await prisma.$executeRaw`
    DELETE FROM "QueryChunk"
    WHERE "userId" = ${userId};
  `;
};

/**
 * Deletes a single vector chunk by its ID.
 */
export const deleteVectorById = async (chunkId: string) => {
  await prisma.$executeRaw`
    DELETE FROM "QueryChunk"
    WHERE "id" = ${chunkId};
  `;
};

// Backward-compatible alias
export const deleteVectorsByDocumentId = deleteVectorsByUserId;
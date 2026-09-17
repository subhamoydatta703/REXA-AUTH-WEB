import { createEmbeddings } from "./embeddingService";
import { createVector } from "../vectors/vectorService";

export interface ChunkBatchItem {
  chunk: string;
  index: number;
}

/**
 * Processes a batch of text chunks concurrently by generating embeddings and inserting vectors into pgvector.
 */
export const processBatch = async (batch: ChunkBatchItem[], userId: string) => {
  try {
    await Promise.all(
      batch.map(async (item) => {
        const vectorData = await createEmbeddings(item.chunk);
        await createVector(
          userId,
          item.chunk,
          item.index,
          vectorData
        );
      })
    );
  } catch (error) {
    console.error("Error in process batch service: ", error);
    throw error;
  }
};


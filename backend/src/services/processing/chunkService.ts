import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getUserService } from "../user/userService";

// Validates the user and splits the text into semantic chunks using LangChain text splitter.
 
export const createChunks = async (userId: string, textData: string): Promise<string[]> => {
  try {
    const user = await getUserService(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await splitter.splitText(textData);
    console.info("Data chunking completed", {
      userId,
      characterCount: textData.length,
      chunkCount: chunks.length,
    });
    return chunks;
  } catch (error) {
    console.error("Error in chunk service: ", error);
    throw error;
  }
};

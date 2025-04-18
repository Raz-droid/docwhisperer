import { getPineconeClient } from "./pinecone";
import { convertoascii } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchingEmbeddings(
  embeddings: number[],
  filekey: string
) {
  const client = getPineconeClient();
  const index = await client.Index("chatpdfnew");
  try {
    const namespace = index.namespace(convertoascii(filekey));
    const queryResult = await namespace.query({
      topK: 5,
      includeMetadata: true,
      vector: embeddings,
    });
    return queryResult.matches || [];
  } catch (error) {
    console.log("error getting matching embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, file_key: string) {
  try {
    const queryembeddings = await getEmbeddings(query);
    const matches = await getMatchingEmbeddings(queryembeddings, file_key);
    const qualifyingdocs = matches.filter(
      (match) => match.score && match.score > 0.7
    );
    type metadata = {
      pageNumber: number;
      text: string;
    };
    const docs = qualifyingdocs.map((doc) => (doc.metadata as metadata).text);
    return docs.join("\n").substring(0, 3000);
  } catch (error) {
    console.log("Error getting context", error);
    throw error;
  }
}

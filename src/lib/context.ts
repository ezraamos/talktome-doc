import { getEmbeddings } from './actions/openai.actions';
import { getPineconeClient } from './pinecone';
import { convertToAscii } from './utils';

export const getMatchesFromEmbeddings = async (
  embeddings: number[],
  fileKey: string
) => {
  const pinecone = await getPineconeClient();

  const index = await pinecone.Index('talktome');
  try {
    const namespace = convertToAscii(fileKey);
    const queryResult = await index.namespace(namespace).query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (error) {
    console.error('error querying embeddings', error);
    throw error;
  }
};

export const getContext = async (query: string, fileKey: string) => {
  const queryEmbeddings = await getEmbeddings(query);

  //matched embeddings from user query and uploaded pdf
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.2
  );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  const docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);

  return docs.join('\n').substring(0, 3000);
};

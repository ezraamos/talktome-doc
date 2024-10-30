import {
  Pinecone,
  PineconeRecord,
  RecordMetadata,
} from '@pinecone-database/pinecone';
import { downloadFromS3 } from './actions/s3.actions';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import {
  Document,
  RecursiveCharacterTextSplitter,
} from '@pinecone-database/doc-splitter';
import { getEmbeddings } from './actions/openai.actions';
import md5 from 'md5';
import { convertToAscii } from './utils';

let pinecone: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  }
  return pinecone;
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export const loadS3IntoPinecone = async (fileKey: string) => {
  //1. obtain the pdf -> download and read pdf
  console.log('downloading s3 into file system');
  const fileName = await downloadFromS3(fileKey);
  if (!fileName) {
    throw new Error('could not download from s3');
  }
  const loader = new PDFLoader(fileName);
  const pages = (await loader.load()) as PDFPage[];

  //2. Split and Segment the pdf into smaller docs
  const documents = await Promise.all(
    pages.map((page) => {
      return prepareDocument(page);
    })
  );

  //3, Vectorize and embed individual documents

  const vectors = await Promise.all(
    documents.flat().map((doc) => {
      return embedDocument(doc);
    })
  ).then((results) => results.filter((vector) => vector !== undefined));

  //4. upload to pinecone

  const client = await getPineconeClient();

  const pineconeIndex = client.Index('talktome');

  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

  const BATCH_SIZE = 10;
  const recordChunks = chunkArray(vectors, BATCH_SIZE);

  // Upsert data in batches
  console.log('inserting  vectors into pinecone');
  for (const chunk of recordChunks) {
    try {
      await namespace.upsert(chunk);
    } catch (error) {
      console.error('Error during upsert:', error);
    }
  }

  return documents[0];
};

const embedDocument = async (doc: Document) => {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);

    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord<RecordMetadata>;
  } catch (error) {
    console.error('embedDocument error:', error);
  }
};

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
};

export const prepareDocument = async (page: PDFPage) => {
  let { pageContent } = page;
  const { metadata } = page;

  pageContent = pageContent
    .replace(/\n+/g, ' ') // Replace new lines with a single space
    .replace(/ +/g, ' ') // Replace multiple spaces with a single space
    .trim();

  //split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000), // Pinecone string limitation 36000 bytes
      },
    }),
  ]);
  return docs;
};

// Helper function to break an array into chunks
const chunkArray = (
  array: PineconeRecord<RecordMetadata>[],
  batchSize: number
) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += batchSize) {
    chunks.push(array.slice(i, i + batchSize));
  }
  return chunks;
};

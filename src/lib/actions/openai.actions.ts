'use server';
import { OpenAIApi, Configuration } from 'openai-edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const getEmbeddings = async (text: string) => {
  try {
    const response = await openai.createEmbedding({
      model: 'text-embedding-3-small',
      input: text.replace(/\n/g, ' '),
    });

    const result = await response.json();
    return result.data[0].embedding as number[]; //vector
  } catch (error) {
    console.log('getEmbeddings error:', error);
    throw error;
  }
};

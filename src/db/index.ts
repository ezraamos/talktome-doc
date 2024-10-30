import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('Database url not found');
}
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);

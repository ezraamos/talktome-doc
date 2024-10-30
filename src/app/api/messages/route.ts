import { db } from '@/db';
import { messages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const chatId = req.nextUrl.searchParams.get('chatId');
  if (!chatId) {
    return NextResponse.json({ messages: [] }, { status: 200 });
  }
  const _messages = await db
    .select()
    .from(messages)
    .where(eq(messages.chatId, parseInt(chatId)));

  return NextResponse.json({ messages: _messages }, { status: 200 });
};

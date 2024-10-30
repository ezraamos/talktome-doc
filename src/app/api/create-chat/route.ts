import { auth } from '@/auth';
import { db } from '@/db';
import { chats } from '@/db/schema';
import { getS3Url } from '@/lib/actions/s3.actions';
import { loadS3IntoPinecone } from '@/lib/pinecone';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();

  try {
    if (!session || !session.user) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { user } = session;

    const body = await req.json();
    const { fileKey, fileName } = body;

    if (!fileKey || !fileName || !user.id) {
      return NextResponse.json(
        { error: 'missing required fields' },
        { status: 400 }
      );
    }

    await loadS3IntoPinecone(fileKey);

    const chatId = await db
      .insert(chats)
      .values({
        fileKey: fileKey,
        pdfName: fileName,
        pdfUrl: getS3Url(fileKey),
        userId: user.id,
      })
      .returning({
        insertedId: chats.id,
      });

    return NextResponse.json({ chatId: chatId[0].insertedId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}

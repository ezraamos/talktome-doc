import { auth } from '@/auth';
import ChatComponent from '@/components/ChatComponent';
import ChatSidebar from '@/components/ChatSidebar';
import PDFViewer from '@/components/PDFViewer';
import { db } from '@/db';
import { chats } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

type Props = {
  params: { chatId: string };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return redirect('/');
  }
  const userId = session.user.id;
  const _chats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, userId))
    .orderBy(desc(chats.createdAt));

  if (!_chats) {
    return redirect('/');
  }

  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect('/');
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  return (
    <div className='max-h-[calc(100vh-3.5rem-1px)] min-h-[calc(100vh-3.5rem-1px)] mx-auto max-w-screen-2xl  flex w-full rounded-lg shadow-lg pt-4 '>
      {/* chat sidebar */}
      <div className=' flex-[1] max-w-xs '>
        <ChatSidebar chatId={parseInt(chatId)} chats={_chats} />
      </div>
      {/* pdf viewer */}
      <div className='overflow-auto flex-[5] '>
        <PDFViewer pdfUrl={currentChat?.pdfUrl || ''} />
      </div>
      {/* chat component */}
      <div className='flex-[3] '>
        <ChatComponent chatId={parseInt(chatId)} />
      </div>
    </div>
  );
};

export default ChatPage;

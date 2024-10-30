'use client';
import { DrizzleChat } from '@/db/schema';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { MessageCircle, PlusCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import SubscriptionButton from './SubscriptionButton';

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSidebar = ({ chats, chatId, isPro }: Props) => {
  return (
    <div className='w-full min-h-full max-h-full p-4'>
      <Link href='/'>
        <Button className='w-full bg-white dark:bg-black text-black dark:text-white border border-dashed border-gray-700 dark:border-white '>
          <PlusCircleIcon className='mr-2  w-4 h-4' />
          New Chat
        </Button>
      </Link>
      <div className='flex flex-col gap-2 mt-4'>
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn('rounded-lg p-3 text-slate-900 flex items-center', {
                'bg-blue-600 text-white': chat.id == chatId,
                ' text-white': chat.id !== chatId,
              })}
            >
              <MessageCircle className='mr-2' />
              <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className='absolute bottom-4 left-4 '>
        <div className='flex items-center gap-2 text-sm text-slate-500 flex-wrap'>
          <Link href={'/'}>Home</Link>
          <Link href={'/'}>Source</Link>
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default ChatSidebar;

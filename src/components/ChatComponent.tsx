'use client';
import React from 'react';
import { Input } from './ui/input';
import { Message, useChat } from 'ai/react';
import { SendIcon } from 'lucide-react';
import { Button } from './ui/button';
import MessageList from './MessageList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: async () => {
      const response = await axios.get<{ messages: Message[] }>(
        '/api/messages',
        {
          params: { chatId },
        }
      );

      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: '/api/chat',
    body: {
      chatId,
      // messages implicitly included here by useChat hook based on the input of the user together with entire messages
    },
    initialMessages: data?.messages || [],
  });

  return (
    <div className='relative min-h-full max-h-full overflow-hidden px-2'>
      {/* header */}
      <div className=' p-2 h-fit '>
        <h3 className='text-xl font-bold'>Chat</h3>
      </div>
      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading} />
      <form
        onSubmit={handleSubmit}
        className='absolute bottom-0 inset-x-0 px-2 py-4  bg-white dark:bg-black'
      >
        <div className='flex'>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder='Ask any question'
            className='w-full'
          />
          <Button>
            <SendIcon className='h-4 w-4' />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;

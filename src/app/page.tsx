import { auth } from '@/auth';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { IconBrandGoogle } from '@tabler/icons-react';
import { login } from '../lib/actions/user.actions';
import FileUpload from '@/components/FileUpload';
import { checkSubscription } from '@/lib/subscription';
import SubscriptionButton from '@/components/SubscriptionButton';
import { chats } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  const isPro = await checkSubscription();
  let firstChat;

  if (user?.id) {
    firstChat = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, user.id))
      .orderBy(desc(chats.createdAt))
      .limit(1);

    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <MaxWidthWrapper className='pt-10'>
      <div className='flex flex-col items-center text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className='font-semibold text-3xl'>
          Chat with your PDFs using our AI-powered platform
        </h1>
        <div className='flex mt-2'>
          {user && firstChat && (
            <Link href={`/chat/${firstChat.id}`}>
              <Button>
                Go to Chats <ArrowRight className='ml-2' />
              </Button>
            </Link>
          )}
          {user && (
            <div className='ml-3'>
              <SubscriptionButton isPro={isPro} />
            </div>
          )}
        </div>
        <p className='mt-1 text-lg'>
          Turn any PDF into an interactive experience with real-time AI
          responses.{' '}
        </p>
        <div className='mt-4 w-full'>
          {user ? (
            <FileUpload />
          ) : (
            <form className='flex justify-center' action={login}>
              <Button
                variant='outline'
                className='mx-auto dark:border-muted-foreground dark:text-muted-foreground'
              >
                <IconBrandGoogle className='h-4 w-4 ' />
                <span className='font-semibold'>Login with Google</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

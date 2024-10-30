import { auth } from '@/auth';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { IconBrandGoogle } from '@tabler/icons-react';
import { login } from '../lib/actions/user.actions';
import FileUpload from '@/components/FileUpload';

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <MaxWidthWrapper className='pt-10'>
      <div className='flex flex-col items-center text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className='font-semibold text-3xl'>
          Chat with your PDFs using our AI-powered platform
        </h1>
        <div className='mt-2'>{user && <Button>Go to Chats</Button>}</div>
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

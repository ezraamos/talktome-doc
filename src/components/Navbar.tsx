import { auth } from '@/auth';
import MaxWidthWrapper from './MaxWidthWrapper';
import { ThemeToggler } from './ThemeToggler';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { CircleUser, LogOut } from 'lucide-react';
import { logout } from '@/lib/actions/user.actions';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className='inset-x-0 top-0 w-full border-b border-gray-200 transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between'>
          {/* place holder div */}

          <ThemeToggler />
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='secondary'
                  size='icon'
                  className='rounded-full'
                >
                  <Avatar>
                    <AvatarImage
                      referrerPolicy={'no-referrer'}
                      src={user.image ?? undefined}
                    />
                    <AvatarFallback>
                      <CircleUser className='h-5 w-5' />
                    </AvatarFallback>
                  </Avatar>

                  <span className='sr-only'>Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                <DropdownMenuItem>
                  <div className='w-full flex justify-center'>
                    <span className='font-medium text-base'>
                      {session?.user?.name}
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <form className='flex justify-center' action={logout}>
                    <Button
                      variant='outline'
                      className='mx-auto dark:border-muted-foreground dark:text-muted-foreground'
                    >
                      <LogOut className='h-4 w-4 ' />
                      <span className='font-semibold'>Logout</span>
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;

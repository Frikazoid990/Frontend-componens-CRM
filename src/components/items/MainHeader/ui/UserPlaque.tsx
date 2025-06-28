import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authApiRoutes } from '@/constants/routes';
import { type SessionType } from '@/hooks/useSession';
import { cn } from '@/lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { UserIcon } from 'lucide-react';

interface Props {
  user: SessionType | null;
}

const UserPlaque = ({ user }: Props) => {
  const logOutHandler = async (): Promise<void> => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + authApiRoutes.LogOut, {
        method: 'POST',
        credentials: 'include', // обязательно!
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      const result = await response.json();
      console.log(result.message); // "Logged out successfully"
      // Здесь можно выполнить логику обновления состояния, например: // Перенаправление на страницу входа
    } catch (error) {
      console.error('Error during logout:', error);
      // Можно показать уведомление об ошибке
    }
  };
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn('flex items-center gap-2 rounded-3xl bg-black px-4 py-2 hover:bg-[#4e4d4d]')}>
        <Avatar className="h-8 w-8">
          <AvatarImage alt={user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? 'U'} />
          <AvatarFallback>
            <UserIcon className="h-4 w-4 text-[black]" />
          </AvatarFallback>
        </Avatar>
        <span>{user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? 'User'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? 'User'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem asChild>
					<Link href={DEFAULT_LOGIN_REDIRECT}>Profile</Link>
				</DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => {
            logOutHandler();
            navigate({ to: '/auth' });
          }}
        >
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserPlaque;

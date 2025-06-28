import { useSession } from '@/hooks/useSession';
import { Link } from '@tanstack/react-router';
import UserPlaque from './UserPlaque';

const LogInButton = ({ text = 'Войти' }) => {
  const user = useSession();
  return (
    <>
      {user ? (
        <UserPlaque user={user} />
      ) : (
        <Link
          to="/auth"
          className="bg-primary text-primary-foreground focus:ring-primary transform rounded-xl px-6 py-4 shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-[#464444] focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-[0.99]"
        >
          {text}
        </Link>
      )}
    </>
  );
};

export default LogInButton;

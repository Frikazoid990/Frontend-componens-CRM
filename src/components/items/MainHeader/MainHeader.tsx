import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';
import HeaderOutline from './ui/HeaderOutline';
import LoginButton from './ui/LoginButton';

const MainHeader = () => {
  const currentPath = useLocation();
  console.log('Current path:', currentPath);
  return (
    <>
      <header
        id="home-header"
        className="h-header text-primary-foreground sticky top-0 z-50 flex w-full items-center justify-between bg-slate-100 p-4 px-6"
      >
        <div className="flex items-center gap-11">
          <h1 className="text-primary text-3xl font-bold">
            <Link to={'/'}>Car Naeb</Link>
          </h1>
          <nav>
            <ul className="flex gap-11">
              {userMenuList.map(item => (
                <li
                  key={item.title}
                  className={cn(
                    'text-primary text-lg hover:text-slate-400',
                    currentPath.pathname === item.path && 'text-slate-400',
                  )}
                >
                  <Link to={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <LoginButton />
        </div>
      </header>

      <HeaderOutline />
    </>
  );
};

export default MainHeader;

const userMenuList = [
  { title: 'Cars', path: '/' },
  { title: 'Personal Office', path: '/personal_office' },
];

// const managerMenuList = [
// 	{ title: 'Dashboard', path: '/dashboard' },
// 	{ title: 'Settings', path: '/settings' },
// 	{ title: 'Users', path: '/users' },
// ]

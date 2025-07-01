import { useSession } from '@/hooks/useSession';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';
import HeaderOutline from './ui/HeaderOutline';
import LoginLabel from './ui/LoginLabel';

type MenuItem = {
  title: string;
  path: string;
};

const userMenuList: MenuItem[] = [
  { title: 'Каталог автомобилей', path: '/' },
  { title: 'Личный кабинет клиента', path: '/personal_office' },
];

const allManagerMenuList: MenuItem[] = [
  { title: 'Рабочий стол', path: '/manager/dashboard' },
  { title: 'Сделки', path: '/manager/deals' },
  { title: 'Тест-драйв', path: '/manager/test_drives' },
  { title: 'Отчеты', path: '/manager/reporting' },
];

const MainHeader = () => {
  const currentPath = useLocation();
  const user = useSession();
  const role = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? 'CLIENT';
  const isManagerRoute = currentPath.pathname.startsWith('/manager');

  const managerRoles = ['ADMIN', 'MANAGER', 'SENIORMANAGER', 'DIRECTOR'];

  // Теперь фильтруем меню внутри компонента — можно использовать хуки!
  const filteredManagerMenu = allManagerMenuList.filter(section => {
    if (role === 'MANAGER') {
      return ['Рабочий стол', 'Сделки', 'Тест-драйв'].includes(section.title);
    }
    return true;
  });

  const menu = managerRoles.includes(role) && isManagerRoute ? filteredManagerMenu : userMenuList;

  return (
    <>
      <header
        id="home-header"
        className="h-header text-primary-foreground sticky top-0 z-50 flex w-full items-center justify-between bg-slate-100 p-4 px-6"
      >
        <div className="flex items-center gap-11">
          <h1 className="text-primary text-3xl font-bold">
            <Link to={'/'}>Автосалон "Автоцентр XXI"</Link>
          </h1>
          <nav>
            <ul className="flex gap-11">
              {menu.map((item: MenuItem) => (
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
          <LoginLabel />
        </div>
      </header>

      <HeaderOutline />
    </>
  );
};

export default MainHeader;

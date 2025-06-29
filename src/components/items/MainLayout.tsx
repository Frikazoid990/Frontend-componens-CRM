import { Outlet } from '@tanstack/react-router';
import MainHeader from './MainHeader/MainHeader';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <MainHeader />
      <main className="min-h-full w-full flex-grow overflow-hidden">{<Outlet />}</main>
    </div>
  );
};

export default MainLayout;

import { Outlet } from '@tanstack/react-router';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

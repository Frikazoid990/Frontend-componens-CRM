import AuthPage from '@/components/pages/auth/AuthPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthPage />;
}

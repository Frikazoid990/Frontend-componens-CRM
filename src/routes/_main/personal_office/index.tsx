import PersonalOffice from '@/components/pages/user/PersonalOffice/PersonalOffice';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/personal_office/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <PersonalOffice />;
}

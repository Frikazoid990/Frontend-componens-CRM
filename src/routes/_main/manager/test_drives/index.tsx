import ManagementTestDrives from '@/components/pages/manager/ManagmentTestDrives/ManagmentTestDrives';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/manager/test_drives/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ManagementTestDrives />;
}

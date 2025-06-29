import ManagementDeals from '@/components/pages/manager/ManagmentDeals/ManagementDeals';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/manager/deals/')({
  component: ManagementDeals,
});

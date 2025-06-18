import ManagementDeals from '@/components/pages/ManagementDeals'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/deals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ManagementDeals />
}

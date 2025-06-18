import ManagementDashboard from '@/components/pages/ManagementDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ManagementDashboard/>
}

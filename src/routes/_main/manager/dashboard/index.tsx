import ManagementDashboard from '@/components/pages/manager/ManagementDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/dashboard/')({
  component: ManagementDashboard,
})



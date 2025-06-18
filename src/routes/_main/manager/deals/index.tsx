import ManagementDeals from '@/components/pages/manager/ManagementDeals'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/deals/')({
  component: ManagementDeals,
})

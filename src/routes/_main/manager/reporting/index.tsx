import Reporting from '@/components/pages/Reporting'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/reporting/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Reporting/>
}

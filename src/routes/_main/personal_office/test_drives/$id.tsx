import TestDrivePage from '@/components/pages/TestDrive'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/personal_office/test_drives/$id')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <TestDrivePage />
}

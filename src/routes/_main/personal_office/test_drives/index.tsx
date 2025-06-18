import TestDrivesList from '@/components/pages/TestDrivesList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/personal_office/test_drives/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TestDrivesList />
}

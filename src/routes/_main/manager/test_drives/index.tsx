
import ManagementTestDrives from '@/components/pages/ManagmentTestDrives'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/test_drives/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ManagementTestDrives />
}

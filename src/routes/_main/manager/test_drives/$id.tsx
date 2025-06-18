import TestDrive from '@/components/pages/manager/TestDrive'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/test_drives/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TestDrive/>
}

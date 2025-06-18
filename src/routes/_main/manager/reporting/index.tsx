import Reporting from '@/components/pages/manager/Reporting'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/reporting/')({
  component: Reporting,
})


import Deal from '@/components/pages/manager/Deal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/deals/$id')({
  component: Deal,
})


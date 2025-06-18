import Home from '@/components/pages/Home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Home/>
}

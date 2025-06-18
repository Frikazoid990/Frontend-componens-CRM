import AuthError from '@/components/pages/AuthError'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/error/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthError/>
}

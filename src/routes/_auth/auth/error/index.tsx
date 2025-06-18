import AuthError from '@/components/pages/auth/AuthError'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/error/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthError/>
}

import LoginForm from '@/components/pages/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm/>
}

import RegisterForm from '@/components/pages/RegisterForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegisterForm/>
}

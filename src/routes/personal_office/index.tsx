import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/personal_office/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/personal_office/"!</div>
}

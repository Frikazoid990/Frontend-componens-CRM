import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manager/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/manager/dashboard/"!</div>
}

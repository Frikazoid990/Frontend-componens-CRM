import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/manager/deals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/manager/deals/"!</div>
}

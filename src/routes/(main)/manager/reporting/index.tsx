import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/manager/reporting/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/manager/reporting/"!</div>
}

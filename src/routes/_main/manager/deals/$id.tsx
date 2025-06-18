import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manager/deals/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/manager/deals/$id"!</div>
}

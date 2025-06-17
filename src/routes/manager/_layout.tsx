import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manager/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/manager/_layout"!</div>
}

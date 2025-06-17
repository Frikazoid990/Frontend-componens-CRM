import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/personal_office/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/personal_office/"!</div>
}

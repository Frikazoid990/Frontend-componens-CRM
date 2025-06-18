import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/personal_office/deal/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/personal_office/deal/"!</div>
}

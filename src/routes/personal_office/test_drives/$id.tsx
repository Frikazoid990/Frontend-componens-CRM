import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/personal_office/test_drives/$id')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/(main)/personal_office/test_drives/$id"!</div>
}

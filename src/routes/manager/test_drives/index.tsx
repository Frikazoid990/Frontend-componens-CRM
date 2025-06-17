import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manager/test_drives/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/manager/test_drives/"!</div>
}

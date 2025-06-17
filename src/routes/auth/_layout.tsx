import { createFileRoute, Outlet } from '@tanstack/react-router'


export const Route = createFileRoute('/auth/_layout')({
	component: AuthLayout
})


function AuthLayout () {
	return (
		<div className="flex h-screen w-screen">
				<h1>AuthLayout</h1>
				<Outlet />
			
		</div>
	)
}
import { createFileRoute, Outlet } from '@tanstack/react-router'


export const Route= createFileRoute('/auth/_layout')({
	component: AuthLayout
})


function AuthLayout () {
	return (
		<div className="flex h-screen w-screen">
			<div className="flex-1 bg-gray-100">
				<Outlet />
			</div>
			<div className="w-1/3 bg-white p-6">
				<h1 className="text-2xl font-bold mb-4">Authentication</h1>
				<Outlet />
			</div>
		</div>
	)
}
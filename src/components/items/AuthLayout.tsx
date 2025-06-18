import { Outlet } from '@tanstack/react-router'

const AuthLayout = () => {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Auth</h1>
			<div className="bg-white shadow-md rounded-lg p-6">
					<Outlet />
			</div>
		</div>
	)
}

export default AuthLayout

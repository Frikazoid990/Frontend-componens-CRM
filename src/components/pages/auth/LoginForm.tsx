
const LoginForm = () => {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Login</h1>
			<form className="space-y-4">
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Login
				</button>
			</form>
		</div>
	)
}

export default LoginForm

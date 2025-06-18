import { Outlet } from '@tanstack/react-router'

const MainLayout = () => {
	return (
		<div>
			<h1>MainLayout</h1>
			<Outlet/>
		</div>
	)
}

export default MainLayout

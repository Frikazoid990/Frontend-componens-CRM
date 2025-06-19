import { Outlet } from '@tanstack/react-router'
import MainHeader from './MainHeader/MainHeader'

const MainLayout = () => {
	return (

		<div className='flex min-h-screen flex-col items-center'>
			<MainHeader />
			<main className='min-h-[1000px] w-full flex-grow'>{<Outlet/>}</main>
	
		</div>

	)
}

export default MainLayout

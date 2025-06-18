import { Link } from '@tanstack/react-router'
import HeaderOutline from './ui/HeaderOutline'
import LoginButton from './ui/LoginButton'

const MainHeader = () => {
	return (
		<>
			<header
				id='home-header'
				className='sticky top-0 z-50 flex h-header w-full items-center justify-between bg-slate-100 p-4 px-6 text-primary-foreground'
			>
				<div className='flex items-center gap-11'>
					<h1 className='text-3xl font-bold text-primary'>
						<Link to={"/"}>Car Naeb</Link>
					</h1>
					<nav>
						<ul className='flex gap-11'>
							{userMenuList.map(item => (
								<li key={item.title} className='text-lg text-primary hover:text-slate-400'>
									<Link to={item.path}>{item.title}</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className='flex items-center gap-6'>
					<LoginButton />
		
				</div>
			</header>

			<HeaderOutline />
		</>
	)
}

export default MainHeader


const userMenuList = [
	{ title: 'Cars', path: '/' },
	{ title: 'Personal Office', path: '/personal_office' },
	
]
	
// const managerMenuList = [
// 	{ title: 'Dashboard', path: '/dashboard' },
// 	{ title: 'Settings', path: '/settings' },
// 	{ title: 'Users', path: '/users' },	
// ]

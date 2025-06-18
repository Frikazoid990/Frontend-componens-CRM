import { useEffect } from 'react'

const HeaderOutline = () => {
	useEffect(() => {
		const headerEl = document.getElementById('home-header');
		if (!headerEl) return;

		function handleScroll() {
			if (headerEl === null) return;

			if (window.scrollY > 0) {
				headerEl.classList.add('outline', 'outline-1', 'outline-accent');
			} else {
				headerEl.classList.remove('outline', 'outline-1', 'outline-accent');
			}
		}

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return null;
};

export default HeaderOutline;
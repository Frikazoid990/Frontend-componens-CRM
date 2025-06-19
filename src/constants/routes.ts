	export const apiRoute = '/api/cars';


	export const carApiRoutes = {
		allCar :'/car/getallcars',
	}

	export const authApiRoutes = {
		signIn: '/auth/signIn',
		registration: '/auth/registration',
	}

	export const dealApiRoutes = {
		addDeal: '/deal/add-deal',

		updateDealWithEmployee: (dealId: string) =>  `/deal/update-deal-with-employee/${dealId}`,

		updateDealWithStatus: (dealId: string) => `/deal/update-deal-with-status/${dealId}`,

	}
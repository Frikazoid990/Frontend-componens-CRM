import { apiRoute } from '@/constants/routes'
import type { CarType } from '@/types/car.type'

	export const fetchCarsAction = async ():Promise<CarType[]> =>{
		const response = await fetch(apiRoute);
		if (!response.ok) {
			throw new Error('Failed to fetch cars');
		}
		const data = await response.json();
		return data as CarType[];
	}
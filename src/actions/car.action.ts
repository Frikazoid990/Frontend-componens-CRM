import { carApiRoutes } from '@/constants/routes';
import type { CarType } from '@/types/car.type';

export const fetchCarsAction = async (): Promise<CarType[]> => {
  const response = await fetch(import.meta.env.VITE_API_URL + carApiRoutes.allCar);
  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }
  const data = await response.json();
  return data as CarType[];
};

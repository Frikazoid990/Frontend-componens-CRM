import { managerApiRoutes } from '@/constants/routes';
import type { SessionType } from '@/hooks/useSession';
import type { Employee } from '@/types/Common types/employee.type';

export const fetchStaff = async (user: SessionType | null, token: string | null): Promise<Employee[]> => {
  try {
    if (!user) {
      throw new Error('No user session');
    }
    const response = await fetch(import.meta.env.VITE_API_URL + managerApiRoutes.getStaff, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const staff: Employee[] = await response.json();
    return staff;
  } catch (error) {
    console.log(error);
    return [];
  }
};

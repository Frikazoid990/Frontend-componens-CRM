import { dealApiRoutes } from '@/constants/routes';
import type { DealTypeOut } from '@/types/deal/dealOut.type';

export const createDealAction = async (request: DealTypeOut, token: string): Promise<void> => {
  try {
    const requestBody = JSON.stringify(request);
    const response = await fetch(import.meta.env.VITE_API_URL + dealApiRoutes.addDeal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.success) {
      console.log('Deal created successfully:', data);
    }
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};

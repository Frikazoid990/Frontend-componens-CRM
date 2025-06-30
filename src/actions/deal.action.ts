import { dealApiRoutes } from '@/constants/routes';
import type { DealTypeOut } from '@/types/deal/dealOut.type';
import type { UUID } from 'crypto';

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
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};

export const fetchUpdateEmployeeDeal = async (
  request: UUID | null,
  token: string | null,
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    const requestBody = JSON.stringify(request);
    const url = window.location.href;
    const parts = url.split('/');
    const dealId = parts[parts.length - 1];
    const response = await fetch(import.meta.env.VITE_API_URL + dealApiRoutes.updateDealWithEmployee(dealId), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const successText: string = await response.json();
    return {
      success: successText,
    };
  } catch (error) {
    return {
      error: 'Unknown error',
    };
  }
};

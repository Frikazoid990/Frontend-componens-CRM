import { reportsApiRoutes } from '@/constants/routes';
import type { SessionType } from '@/hooks/useSession';
import type {
  TCarSalesReport,
  TManagerPerformanceReport,
  TSalesFunnelReport,
} from '@/types/manager/reports/reposrts.type';

export const fetchManagerPerformanceReport = async (
  user: SessionType | null,
  token: string | null,
  start,
): Promise<{
  data?: TManagerPerformanceReport;
  error?: string;
}> => {
  try {
    if (!user) {
      throw new Error('No user session');
    }

    const url = import.meta.env.VITE_API_URL + reportsApiRoutes.getManagerReport;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const report: TManagerPerformanceReport = await response.json();
    return { data: report };
  } catch (error) {
    console.log(error);
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch test drive statuses',
    };
  }
};

export const fetchOverallSalesReport = async (
  user: SessionType | null,
  token: string | null,
): Promise<{
  data?: TCarSalesReport;
  error?: string;
}> => {
  try {
    if (!user) {
      throw new Error('No user session');
    }

    const url = import.meta.env.VITE_API_URL + reportsApiRoutes.getCarReport;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const report: TCarSalesReport = await response.json();
    return { data: report };
  } catch (error) {
    console.log(error);
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch test drive statuses',
    };
  }
};

export const fetchSalesFunnelReport = async (
  user: SessionType | null,
  token: string | null,
): Promise<{
  data?: TSalesFunnelReport;
  error?: string;
}> => {
  try {
    if (!user) {
      throw new Error('No user session');
    }

    const url = import.meta.env.VITE_API_URL + reportsApiRoutes.getFunnelReport;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const report: TSalesFunnelReport = await response.json();
    return { data: report };
  } catch (error) {
    console.log(error);
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch test drive statuses',
    };
  }
};

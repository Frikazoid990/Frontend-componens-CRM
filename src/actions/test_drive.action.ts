import { statusApiRoutes, testDriveApiRoutes } from '@/constants/routes';
import { type SessionType } from '@/hooks/useSession';
import type { TestDriveStatusesType } from '@/types/statuses/test_drive.status.type';
import type { TestDriveTypeOut } from '@/types/test-drive/test_drive.Out.type';
import type { TestDriveType } from '@/types/test-drive/test_drive.type';
import type { UUID } from 'crypto';

export const fetchAvailableSlots = async (
  queryParams: { carId: UUID; date: Date },
  token: string,
): Promise<string[]> => {
  try {
    //URL with query
    const url = new URL(testDriveApiRoutes.availableSlots, import.meta.env.VITE_API_URL);
    url.searchParams.append('date', queryParams.date.toDateString());
    url.searchParams.append('carId', queryParams.carId);

    // console.log('url', url.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return data ?? [];
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return [];
  }
};

export const createTestDriveAction = async (request: Omit<TestDriveTypeOut, 'id' | 'createdAt'>): Promise<void> => {
  try {
    const requestBody = JSON.stringify(request);

    const response = await fetch(import.meta.env.VITE_API_URL + testDriveApiRoutes.addTestDrive, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.success) {
      console.log('Test drive created successfully:', data);
    } else {
      console.error('Failed to create test drive:', data.message);
    }
  } catch (error) {
    console.error('Error creating test drive:', error instanceof Error ? error.message : 'Unknown error occurred');
  }
};

export const fetchUpdateStatus = async (request: number, token: string | null): Promise<void> => {
  try {
    const requestBody = JSON.stringify(request);
    const url = window.location.href;
    const parts = url.split('/');
    const testDriveId = parts[parts.length - 1];
    const response = await fetch(
      import.meta.env.VITE_API_URL + testDriveApiRoutes.updateTestDriveWithStatus(testDriveId),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: requestBody,
      },
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.success) {
      console.log('Update status:', data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateEmployee = async (request: UUID, token: string | null): Promise<void> => {
  try {
    const requestBody = JSON.stringify(request);
    const url = window.location.href;
    const parts = url.split('/');
    const testDriveId = parts[parts.length - 1];
    const response = await fetch(
      import.meta.env.VITE_API_URL + testDriveApiRoutes.updateTestDriveWithEmployee(testDriveId),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: requestBody,
      },
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.success) {
      console.log('Update employee:', data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchTestDriveForManager = async (
  user: SessionType | null,
  token: string | null,
): Promise<TestDriveType | null> => {
  try {
    if (!user) {
      throw new Error('No user session');
    }
    const url = window.location.href;
    const parts = url.split('/');
    const testDriveId = parts[parts.length - 1];
    const response = await fetch(import.meta.env.VITE_API_URL + testDriveApiRoutes.getTestDrive(testDriveId), {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const testDrive: TestDriveType = await response.json();
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return testDrive ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchStatusesForTestDrive = async (
  user: SessionType | null,
  token: string | null,
): Promise<{ data?: TestDriveStatusesType[]; error?: string }> => {
  try {
    if (!user) {
      throw new Error('No user session');
    }
    const response = await fetch(import.meta.env.VITE_API_URL + statusApiRoutes.getStatusTestDrives, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const statuses: TestDriveStatusesType[] = await response.json();
    return { data: statuses };
  } catch (error) {
    console.log(error);
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch test drive statuses',
    };
  }
};

export const fetchTestDrivesForManager = async (
  user: SessionType | null,
  token: string | null,
): Promise<{ data?: TestDriveType[]; error?: string }> => {
  try {
    if (!user) {
      throw new Error('No user session');
    }

    const url = import.meta.env.VITE_API_URL + testDriveApiRoutes.getTestDrives;

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const testDrives: TestDriveType[] = await response.json();
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return {
      data: testDrives,
    };
  } catch (error) {
    console.log(error);
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch test drives',
    };
  }
};

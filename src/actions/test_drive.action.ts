import { testDriveApiRoutes } from '@/constants/routes';
import type { TestDriveTypeOut } from '@/types/test-drive/test_drive.Out.type';
import type { UUID } from 'crypto';

export const fetchAvailableSlots = async (queryParams: { carId: UUID; date: Date }): Promise<string[]> => {
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

export const fetchUpdateStatus = async (request: number): Promise<void> => {
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

export const fetchUpdateEmployee = async (request: UUID): Promise<void> => {
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

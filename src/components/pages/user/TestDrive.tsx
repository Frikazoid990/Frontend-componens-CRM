import { testDriveApiRoutes } from '@/constants/routes';
import { formatDateSafe } from '@/lib/format-data';
import type { TestDriveType } from '@/types/test-drive/test_drive.type';
import { useEffect, useState } from 'react';

const TestDrivePage = () => {
  const [testDrive, setTestDrive] = useState<TestDriveType | null>();

  const fetchTestDrive = async (): Promise<TestDriveType | null> => {
    try {
      const url = window.location.href;
      const parts = url.split('/');
      const testDriveId = parts[parts.length - 1];
      const response = await fetch(import.meta.env.VITE_API_URL + testDriveApiRoutes.getTestDrive(testDriveId), {
        method: 'GET',
        credentials: 'include',
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

  useEffect(() => {
    fetchTestDrive().then(testDrive => {
      setTestDrive(testDrive);
    });
  }, []);

  // Функция для безопасного форматирования даты

  const { date: formattedDate, time: formattedTime } = formatDateSafe(testDrive?.plannedDate);

  return (
    <div>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="mb-6 text-3xl font-semibold">Информация о тест-драйве</h2>

        {/* Test Drive Information Section */}
        <div className="mb-8 rounded-lg border border-gray-300 p-6">
          <p className="mb-2 text-lg">
            <span className="font-medium">Статус: </span> {testDrive?.status ?? 'N/A'}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-medium">Дата проведения:</span> {formattedDate}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-medium">Время проведения:</span> {formattedTime}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-medium">Ответственный менеджер:</span> {testDrive?.employee?.fullName ?? 'N/A'}
          </p>
          <p className="text-lg">
            <span className="font-medium">Машина:</span> {testDrive?.car.brand ?? 'N/A'}{' '}
            <span className="ml-4 font-medium">Модель:</span> {testDrive?.car.model ?? 'N/A'}
          </p>
        </div>
      </main>
    </div>
  );
};

export default TestDrivePage;

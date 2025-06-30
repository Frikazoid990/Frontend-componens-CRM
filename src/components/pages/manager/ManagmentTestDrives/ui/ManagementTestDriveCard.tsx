import { Card, CardContent } from '@/components/ui/card';
import type { TestDriveType } from '@/types/test-drive/test_drive.type';
import { Link } from '@tanstack/react-router';

interface Props {
  testDrive: TestDriveType;
}

const ManagementTestDriveCard = ({ testDrive }: Props) => {
  const formattedDate = new Date(testDrive.plannedDate).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = new Date(testDrive.plannedDate).toLocaleTimeString('ru-Ru', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card key={testDrive.id} className="border border-gray-200">
      <CardContent className="p-4">
        <div className="grid grid-cols-5 gap-5 text-sm">
          <div>
            <span className="font-medium text-gray-700">Клиент:</span>
            <div className="mt-1 text-gray-900">{testDrive.client.fullName}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Сотрудник:</span>
            <div className="mt-1 text-gray-900">{testDrive.employee?.fullName ?? 'N/A'}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Дата:</span>
            <div className="mt-1 text-gray-900">{formattedDate}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Время:</span>
            <div className="mt-1 text-gray-900">{formattedTime}</div>
          </div>

          <div>
            <span className="font-medium text-gray-700">Car:</span>
            <div className="mt-1 text-gray-900">{testDrive.car.model}</div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Link
            to={`/manager/test_drives/$id`}
            params={{ id: testDrive.id }}
            className="col-span-4 mt-2 inline-flex items-center text-blue-600 hover:underline"
          >
            Подробнее
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementTestDriveCard;

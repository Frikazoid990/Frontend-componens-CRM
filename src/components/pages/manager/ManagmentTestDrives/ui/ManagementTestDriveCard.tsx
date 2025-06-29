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

  return (
    <Card key={testDrive.id} className="border border-gray-200">
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Client:</span>
            <div className="mt-1 text-gray-900">{testDrive.client.fullName}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Employee:</span>
            <div className="mt-1 text-gray-900">{testDrive.employee?.fullName ?? 'N/A'}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Date:</span>
            <div className="mt-1 text-gray-900">{formattedDate}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Car:</span>
            <div className="mt-1 text-gray-900">{testDrive.car.model}</div>
          </div>

          <Link
            to={`/manager/deals/$id`}
            params={{ id: testDrive.id }}
            className="col-span-4 mt-2 inline-flex items-center text-blue-600 hover:underline"
          >
            Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementTestDriveCard;

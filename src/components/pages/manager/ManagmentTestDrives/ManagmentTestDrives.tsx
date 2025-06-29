import { fetchTestDrivesForManager } from '@/actions/test_drive.action';
import { Button } from '@/components/ui/button';
import { useSession } from '@/hooks/useSession';
import { useToken } from '@/hooks/useToken';
import { TestDriveStatus, type TestDriveType } from '@/types/test-drive/test_drive.type';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import ManagementTestDriveCard from './ui/ManagementTestDriveCard';

// export interface TestDrive {
//   id: string;
//   client: string;
//   employee: string;
//   date: string;
//   car: string;
// }

// type TestDriveStatus = 'Not Assigned' | 'In Progress' | 'Completed' | 'Canceled';

interface StatusSection {
  id: TestDriveStatus;
  title: string;
}

const ManagementTestDrives = () => {
  const [testDrivesTable, setTestDrivesTable] = useState<Record<string, TestDriveType[]> | null>(null);

  const user = useSession();
  const token = useToken();

  const fetchManagerData = async () => {
    const testDrives = await fetchTestDrivesForManager(user, token);

    if (testDrives.error) {
      console.error('Error fetching test drives:', testDrives.error);
    }

    if (testDrives.data) {
      setTestDrivesTable(
        testDrives.data.reduce(
          (acc, testDrive) => {
            const status = testDrive.status; // Assuming testDrive has a status field
            if (!acc[status]) {
              acc[status] = [];
            }
            acc[status].push(testDrive);
            return acc;
          },
          {} as Record<string, TestDriveType[]>,
        ),
      );
    }
  };

  useEffect(() => {
    fetchManagerData();
  }, []);

  const handleCreateTestDrive = () => {
    // Placeholder for create test drive functionality
    console.log('Create Test Drive clicked');
  };

  const testDrivesStatusSections: StatusSection[] = [
    { id: TestDriveStatus.NotAssigned, title: 'Not Assigned' },
    { id: TestDriveStatus.InProgress, title: 'In Progress' },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-6">
      {/* Header with Create Button */}
      <div className="flex justify-end">
        <Button onClick={handleCreateTestDrive} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Test Drive
        </Button>
      </div>

      {/* Status Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {testDrivesStatusSections.map(status => (
          <div key={status.id} className="rounded-lg border border-gray-300">
            {/* Section Header */}
            <div className="border-b border-gray-300 bg-gray-50 px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-800">{status.title} Test Drives:</h2>
            </div>

            {/* Section Content */}
            <div className="max-h-[400px] min-h-[200px] overflow-y-auto p-4">
              {!!testDrivesTable && testDrivesTable[status.title]?.length > 0 ? (
                <div className="space-y-3">
                  {testDrivesTable && testDrivesTable[status.title]?.length > 0 ? (
                    <div className="space-y-3">
                      {testDrivesTable[status.title].map(testDrive => (
                        <ManagementTestDriveCard key={testDrive.id} testDrive={testDrive} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">No test drives in this status</div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">No test drives in this status</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementTestDrives;

// {/* <div key={status.id} className="rounded-lg border border-gray-300">
//             {/* Section Header */}
//             <div className="border-b border-gray-300 bg-gray-50 px-4 py-3">
//               <h2 className="text-lg font-semibold text-gray-800">{status.title} Test Drives:</h2>
//             </div>

//             {/* Section Content */}
//             <div className="min-h-[100px] p-4">
//               {testDrivesTable && testDrivesTable[status.title]?.length > 0 ? (
//                 <div className="space-y-3">
//                   {testDrivesTable[status.title].map(testDrive => (
//                     <ManagementTestDriveCard key={testDrive.id} testDrive={testDrive} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="py-8 text-center text-gray-500">No test drives in this status</div>
//               )}
//             </div>
//           </div> */}

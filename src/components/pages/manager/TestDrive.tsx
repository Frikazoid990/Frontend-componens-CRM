import { fetchStaff } from '@/actions/staff.action';
import {
  fetchStatusesForTestDrive,
  fetchTestDriveForManager,
  fetchUpdateEmployee,
  fetchUpdateStatus,
} from '@/actions/test_drive.action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from '@/hooks/useSession';
import { useToken } from '@/hooks/useToken';
import type { Employee } from '@/types/Common types/employee.type';
import type { TestDriveStatusesType } from '@/types/statuses/test_drive.status.type';
import type { TestDriveType } from '@/types/test-drive/test_drive.type';
import { useNavigate } from '@tanstack/react-router';
import type { UUID } from 'crypto';
import { useEffect, useState } from 'react';

const TestDriveDetailsCard = () => {
  const token = useToken();
  const [statuses, setStatuses] = useState<TestDriveStatusesType[]>([]);
  const [testDrive, setTestDrive] = useState<TestDriveType | null>(null);
  const [staff, setStaff] = useState<Employee[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useSession();

  const updateStatus = () => {
    if (!user) return;
    setIsPending(true);
    const statusId: number | null = statuses.find(s => s.label === testDrive?.status)?.value ?? null;
    if (statusId) {
      fetchUpdateStatus(statusId, token).finally(() => setIsPending(false));
    } else {
      setIsPending(false);
    }
  };

  const updateEmployee = () => {
    if (!user) return;
    setIsPending(true);
    const employeeId: UUID | null = testDrive?.employee?.id ?? null;
    if (employeeId) {
      fetchUpdateEmployee(employeeId, token).finally(() => setIsPending(false));
    } else {
      setIsPending(false);
    }
  };

  const Update = () => {
    const valueStatus = statuses.find(s => s.label === testDrive?.status)?.value;
    if (valueStatus == 0) updateEmployee();
    updateStatus();
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const [testDrive, statuses, staff] = await Promise.all([
        fetchTestDriveForManager(user, token),
        fetchStatusesForTestDrive(user, token),
        fetchStaff(user, token),
      ]);

      if (statuses.error) {
        console.error('Error fetching statuses:', statuses.error);
      }
      if (statuses.data) {
        setStatuses(statuses.data);
      }
      setTestDrive(testDrive);
      setStaff(staff);
    };
    fetchData();
  }, []);

  const isDisabledStatusSelect = !testDrive?.employee;
  const isDisabledManagerSelect = !!statuses.find(s => s.label == testDrive?.status)?.value;

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Страница управления тест-драйвом</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <p className="text-sm font-medium">
            Дата:{' '}
            <span className="font-normal">
              {testDrive
                ? new Intl.DateTimeFormat('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(testDrive.plannedDate))
                : ''}
            </span>
          </p>
          <p className="text-sm font-medium">
            Время:{' '}
            <span className="font-normal">
              {testDrive
                ? new Intl.DateTimeFormat('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(testDrive.plannedDate))
                : ''}
            </span>
          </p>
          <p className="text-sm font-medium">
            Автомобиль: <span className="font-normal">{testDrive?.car.brand + ' ' + testDrive?.car.model}</span>
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Статус тест-драйва:</p>
            <Select
              value={testDrive?.status || ''}
              onValueChange={newStatus => {
                setTestDrive(prev => (prev ? { ...prev, status: newStatus } : null));
              }}
              disabled={isDisabledStatusSelect}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(statusOption => (
                  <SelectItem key={statusOption.value} value={statusOption.label}>
                    {statusOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Ответственный менеджер:</p>
            <Select
              value={testDrive?.employee?.fullName || ''}
              onValueChange={fullName => {
                const selectedEmployee = staff.find(emp => emp.fullName === fullName);
                setTestDrive(prev => (prev ? { ...prev, employee: selectedEmployee || null } : null));
              }}
              disabled={isDisabledManagerSelect}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Выберите менеджера" />
              </SelectTrigger>
              <SelectContent>
                {staff.map(employee => (
                  <SelectItem key={employee.id} value={employee.fullName}>
                    {employee.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <p className="text-sm font-medium">Информация о клиенте:</p>
          <p className="ml-4 text-sm font-medium">
            ФИО: <span className="font-normal">{testDrive?.client.fullName}</span>
          </p>
          <p className="ml-4 text-sm font-medium">
            Номер телефона: <span className="font-normal">{testDrive?.client.phoneNumber}</span>
          </p>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            className="bg-button-cancel text-button-cancel-foreground bg-[#ec2213] hover:bg-[#eb9a7a]"
            disabled={isPending}
          >
            Отмена
          </Button>
          <Button
            className="text-button-save-foreground bg-[#13ec13] hover:bg-[#7aeb7a]"
            disabled={isPending}
            onClick={Update}
          >
            Сохранить изменения
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestDriveDetailsCard;

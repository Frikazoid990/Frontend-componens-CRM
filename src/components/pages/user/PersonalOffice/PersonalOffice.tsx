import EmptyCard from '@/components/items/PersonalOficeCard/EmptyCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dealApiRoutes, testDriveApiRoutes } from '@/constants/routes';
import { useSession } from '@/hooks/useSession';
import type { DealType } from '@/types/deal/deal.type';
import type { TestDriveType } from '@/types/test-drive/test_drive.type';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

const PersonalOffice = () => {
  const [deal, setDeal] = useState<DealType | null>();
  const [testDrives, setTestDrives] = useState<TestDriveType[]>([]);
  const user = useSession();
  const navigation = useNavigate();

  const fetchDeal = async (): Promise<DealType | null> => {
    try {
      //TODO: This logic not implemented on server!!!
      if (!user) {
        throw new Error('No user session');
      }
      const response = await fetch(import.meta.env.VITE_API_URL + dealApiRoutes.getDealForClient(user.id), {
        method: 'GET',
        credentials: 'include',
      });
      const deal: DealType = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return deal ?? null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const fetchTestDrives = async (): Promise<TestDriveType[]> => {
    try {
      if (!user) {
        throw new Error('No user session');
      }
      const response = await fetch(import.meta.env.VITE_API_URL + testDriveApiRoutes.getTestDrivesForClient(user.id), {
        method: 'GET',
        credentials: 'include',
      });
      const testDrives: TestDriveType[] = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return testDrives;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    console.log(testDrives);
  }, [testDrives]);

  useEffect(() => {
    const fetchData = async () => {
      const [deal, testDrives] = await Promise.all([fetchDeal(), fetchTestDrives()]);
      setDeal(deal);
      setTestDrives(testDrives);
    };
    fetchData();
  }, []);

  return (
    <div>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Сделка:</h2>
        {deal ? (
          <Card className="rounded-xl p-3 shadow-sm">
            <CardHeader className="mb-2 p-0">
              <CardTitle className="text-lg font-semibold">{deal?.status}</CardTitle>
            </CardHeader>
            {/* Изображение находится в отдельном блоке */}
            <div className="mb-2">
              {/* //TODO: Need add on backend */}
              <img
                src={deal.car.imgPath}
                alt="Изображение автомобиля"
                width={50}
                height={30}
                className="h-[80px] w-[150px] rounded-md object-cover"
              />
            </div>
            <CardContent className="flex flex-col gap-2 p-0">
              {/* Описание */}
              <div className="grid gap-1 text-sm">
                <p>
                  <span className="font-medium">Автомобиль:</span> {deal.car.brand + ' ' + deal.car.model}
                </p>
                <p>
                  <span className="font-medium">Дата начала:</span> {new Date(deal.createdAt).toLocaleDateString()}
                </p>
              </div>
              {/* Цена */}
              <div className="flex items-center justify-between">
                <p>
                  <span className="font-medium">Цена:</span> {deal.price + ' (RUB)'}
                </p>
                {/* Кнопка "Подробнее" */}
                <Button
                  onClick={() => {
                    navigation({ to: '/personal_office/deal' });
                  }}
                  variant="outline"
                  size="sm"
                >
                  Подробнее
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <EmptyCard
            text={
              'Пока что у вас нет активных сделок, но вы всегда можете выбрать автомобиль в нашем каталоге по кнопке снизу'
            }
            mainHeaderText={'У вас отсутствует активная сделка'}
          />
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Тест-драйвы:</h2>
        <div className="grid max-h-[350px] gap-4 overflow-y-auto pr-2">
          {testDrives.length ? (
            testDrives.map(testDrive => {
              return (
                <Card key={testDrive.id} className="rounded-xl p-3 shadow-sm">
                  <CardHeader className="mb-2 p-0">
                    <CardTitle className="text-lg font-semibold">
                      {testDrive.car.brand + ' ' + testDrive.car.model}
                    </CardTitle>
                  </CardHeader>
                  {/* Изображение находится в отдельном блоке */}
                  <div className="mb-2">
                    {/* //TODO: Need add on backend */}
                    <img
                      src={testDrive.car.imgPath}
                      alt="Изображение автомобиля"
                      width={70}
                      height={30}
                      className="h-[190px] w-[250px] rounded-md object-cover"
                    />
                  </div>
                  <CardContent className="flex flex-col gap-2 p-0">
                    {/* Описание */}
                    <div className="grid gap-1 text-sm">
                      <p>
                        <span className="font-medium">Дата тест-драйва:</span>{' '}
                        {new Date(testDrive.plannedDate).toLocaleDateString() +
                          ' ' +
                          new Date(testDrive.plannedDate).toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                      </p>
                      <p>
                        <span className="font-medium">Ваш менеджер:</span>{' '}
                        {testDrive.employee ? testDrive.employee.fullName : 'Менеджер скоро будет назначен'}
                      </p>
                    </div>
                    {/* Кнопка "Подробнее" */}
                    <Button
                      onClick={() => {
                        navigation({ to: `/personal_office/test_drives/${testDrive.id}` });
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <EmptyCard
              text={
                'Пока что у вас нет никакой истории тест-драйвов, но вы можете это исправить в нашем каталоге автомобилей, нажав на кнопку ниже :)'
              }
              mainHeaderText={'У вас отсутствуют тест-драйвы'}
            />
          )}
        </div>
      </section>
    </div>
  );
};

const initialTestDrives: TestDriveType[] = [
  {
    id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    plannedDate: '08.12.2002',
    status: 'В процессе',
    car: { brand: 'Honda', id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1', model: 'Civic', imgPath: '/focusrs.jpg' },
    client: {
      fullName: 'Alex',
      id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
      phoneNumber: '+79509260444',
    },
    employee: {
      fullName: 'Georg',
      id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    },
  },
  {
    id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    plannedDate: '08.12.2002',
    status: 'В процессе',
    car: { brand: 'Honda', id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1', model: 'Civic', imgPath: '/focusrs.jpg' },
    client: {
      fullName: 'Alex',
      id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
      phoneNumber: '+79509260444',
    },
    employee: {
      fullName: 'Georg',
      id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    },
  },
  {
    id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    plannedDate: '08.12.2002',
    status: 'В процессе',
    car: { brand: 'Honda', id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1', model: 'Civic', imgPath: '/focusrs.jpg' },
    client: {
      fullName: 'Alex',
      id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
      phoneNumber: '+79509260444',
    },
    employee: {
      fullName: 'Georg',
      id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    },
  },
  {
    id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    plannedDate: '08.12.2002',
    status: 'В процессе',
    car: { brand: 'Honda', id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1', model: 'Civic', imgPath: '/focusrs.jpg' },
    client: {
      fullName: 'Alex',
      id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
      phoneNumber: '+79509260444',
    },
    employee: {
      fullName: 'Georg',
      id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    },
  },
];

const initialDeal: DealType = {
  id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
  createdAt: new Date('2023-05-15T10:00:00Z'),
  isCanceled: false,
  price: 45000,
  status: 'Completed',
  selectedConfiguration: 'Premium Package',
  selectedOptions: {
    engine: ['V6 3.0L'],
    color: [
      {
        name: '',
        hex: '',
      },
    ],
  },
  car: {
    id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    model: 'Camry',
    brand: 'Toyota',
    imgPath: '/focusrs.jpg',
  },
  client: {
    id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    fullName: 'John Smith',
    phoneNumber: '+1234567890',
  },
  employee: {
    id: 'e07f18ad-2186-4294-bffc-80ddd8e57bb1',
    fullName: 'Alice Johnson',
  },
};
export default PersonalOffice;

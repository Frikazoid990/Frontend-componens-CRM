import { dealApiRoutes } from '@/constants/routes';
import { ChatSection } from '@/gpt/deal-details-for-manager/chat-section';
import { CarInfoCard } from '@/gpt/personal-ofice-deal-info-components/car-info-card';
import { DealDetailsCard } from '@/gpt/personal-ofice-deal-info-components/deal-details-card';
import { useSession } from '@/hooks/useSession';
import type { DealType } from '@/types/deal/deal.type';
import { useEffect, useState } from 'react';

const UserDeal = () => {
  const [deal, setDeal] = useState<DealType | null>(initialDeal);
  const user = useSession();

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

  useEffect(() => {
    fetchDeal().then(deal => {
      setDeal(deal);
      console.log(deal);
    });
  }, []);

  return (
    <div>
      {deal ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="col-span-1 space-y-8 md:col-span-2">
            <DealDetailsCard
              startDate={deal ? new Date(deal.createdAt).toLocaleDateString() : ''}
              manager={deal?.employee?.fullName ?? 'N/A'}
              currentOffer={deal.price + ' (RUB)'}
              status={deal.status}
            />
            <div>
              <h2 className="mb-4 text-2xl font-bold">Автомобиль:</h2>
              <CarInfoCard
                carName={deal.car.brand + ' ' + deal.car.model}
                imageUrl={deal.car.imgPath}
                color={deal.selectedOptions.color[0].name}
                engine={deal.selectedOptions.engine[0]}
                configuration={deal.selectedConfiguration}
                currentPrice={deal.price + ' (RUB)'}
              />
            </div>
          </div>
          <div className="col-span-1">
            <ChatSection />
          </div>
        </div>
      ) : (
        <h3>No deal</h3>
      )}
    </div>
  );
};

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

export default UserDeal;

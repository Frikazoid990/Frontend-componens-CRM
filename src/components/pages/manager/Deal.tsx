import { fetchUpdateEmployeeDeal } from '@/actions/deal.action';
import { fetchStaff } from '@/actions/staff.action';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dealApiRoutes } from '@/constants/routes';
import { ChatSection } from '@/gpt/deal-details-for-manager/chat-section';
import { useSession } from '@/hooks/useSession';
import { useToken } from '@/hooks/useToken';
import type { Employee } from '@/types/Common types/employee.type';
import type { DealType } from '@/types/deal/deal.type';
import { Edit, IterationCw } from 'lucide-react';
import { useEffect, useState } from 'react';

const Deal = () => {
  const user = useSession();
  const token = useToken();
  const [isEditingPrice, setIsEditingPrice] = useState<boolean>(false);
  const [currentOffer, setCurrentOffer] = useState<number | null>(0);
  const [deal, setDeal] = useState<DealType | null>(null);
  const [staff, setStaff] = useState<Employee[]>([]);
  const [originalPrice, setOriginalPrice] = useState<number | null>(null);
  const [isCanceled, setIsCanceled] = useState<boolean | null>();
  const isDisabledManagerSelect = deal?.status === 'Менеджер не назначен' ? false : true;

  const fetchDealForManager = async (): Promise<DealType | null> => {
    try {
      if (!user) {
        throw new Error('No user session');
      }
      const url = window.location.href;
      const parts = url.split('/');
      const dealId = parts[parts.length - 1];
      const response = await fetch(import.meta.env.VITE_API_URL + dealApiRoutes.getCurrentDeal(dealId), {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const deal: DealType = await response.json();
      console.log('fetch deal:', deal);
      return deal;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchUpdateDealPrice = async (currentOffer: number): Promise<void> => {
    try {
      const requestBody = JSON.stringify(currentOffer);
      const url = window.location.href;
      const parts = url.split('/');
      const dealId = parts[parts.length - 1];
      const response = await fetch(import.meta.env.VITE_API_URL + dealApiRoutes.updateCurrentDealPrice(dealId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: requestBody,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        console.log('Update price:', data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIsCanceledDeal = async (): Promise<void> => {
    try {
      const url = window.location.href;
      const parts = url.split('/');
      const dealId = parts[parts.length - 1];
      const response = await fetch(import.meta.env.VITE_API_URL + dealApiRoutes.updateDealWithIsCanceled(dealId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        console.log('Update price:', data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDealForManager().then(deal => {
      setDeal(deal);
      setCurrentOffer(deal?.price ?? null);
      setOriginalPrice(deal?.price ?? null);
      setIsCanceled(!!deal?.isCancelled);
    });
    fetchStaff(user, token).then(staff => {
      setStaff(staff);
    });
  }, []);
  const handleEditPrice = () => {
    setIsEditingPrice(true);
  };

  const handleSavePrice = () => {
    setIsEditingPrice(false);
    fetchUpdateDealPrice(currentOffer ?? 0);
  };

  const handleCancelEdit = () => {
    setIsEditingPrice(false);
    setCurrentOffer(originalPrice); // Reset to original value
    fetchUpdateDealPrice(originalPrice ?? 0);
  };

  const handleCancel = () => {
    fetchIsCanceledDeal();
    if (isCanceled) {
      setIsCanceled(false);
    } else {
      setIsCanceled(true);
    }
  };

  const handleSaveEmployee = () => {
    fetchUpdateEmployeeDeal(deal?.employee?.id ?? null, token);
  };

  return (
    <div className="flex flex-1 p-4">
      <div className="flex flex-1 gap-4">
        {/* Center Content */}
        <div className="flex-1">
          <h2 className="mb-4 text-2xl font-semibold"></h2>

          <div className="space-y-4">
            {/* Deal Information */}
            {deal ? (
              <Card className="p-4">
                <div className="space-y-2">
                  {/* Дата начала */}
                  <p>
                    <span className="font-medium">
                      Дата начала: {new Date(deal.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </p>

                  {/* Статус сделки */}
                  <p>
                    <span className="font-medium">Статус: </span>
                    {isCanceled ? <span className="text-red-500">Сделка была отменена!</span> : deal.status}
                  </p>

                  {/* Текущее предложение */}
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Текущее предложение:</span>
                    {isEditingPrice ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={currentOffer === null ? '' : currentOffer.toString()}
                          onChange={e => {
                            const value = e.target.value;

                            // Разрешаем: пустую строку, целые числа, числа с точкой в начале/середине
                            if (value === '') {
                              setCurrentOffer(originalPrice);
                            }
                            // Разрешаем формат: число с точкой (включая точку в начале)
                            else if (/^-?\d*\.?\d*$/.test(value)) {
                              // Запрещаем несколько точек
                              const dotCount = (value.match(/\./g) || []).length;
                              if (dotCount <= 1) {
                                setCurrentOffer(value === '' ? null : parseFloat(value) || 0);
                              }
                            }
                          }}
                          className="w-32"
                          placeholder="Введите значение"
                        />
                        <span className="text-muted-foreground text-sm">(RUB)</span>
                        <Button onClick={handleSavePrice}>Сохранить</Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Отменить
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{currentOffer} (RUB)</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleEditPrice}
                          className="hover:bg-accent hover:text-accent-foreground h-6 px-2 text-xs transition-colors"
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Редактировать
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Ответственный менеджер:</p>
                    <Select
                      value={deal?.employee?.fullName || ''}
                      onValueChange={fullName => {
                        const selectedEmployee: Employee | undefined = staff.find(emp => emp.fullName === fullName);

                        setDeal(prev => {
                          const updatedState: DealType | null = prev ? { ...prev, employee: selectedEmployee } : null;

                          return updatedState;
                        });
                      }}
                      disabled={isDisabledManagerSelect}
                    >
                      <SelectTrigger className="w-[300px]">
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

                  {/* Информация о клиенте */}
                  <p className="font-medium">Информация о клиенте:</p>
                  <p>
                    <span className="font-medium">ФИО:</span> {deal.client.fullName}
                  </p>
                  <p>
                    <span className="font-medium">Телефонный номер:</span> {deal.client.phoneNumber}
                  </p>

                  {/* Кнопки управления */}

                  {isCanceled ? (
                    <div className="mt-4">
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          handleCancel();
                        }}
                        className="inline-flex items-center gap-1 text-blue-600"
                      >
                        <IterationCw size={16} />
                        Переоткрыть
                      </a>
                    </div>
                  ) : (
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={handleCancel}
                      >
                        Отмена
                      </Button>
                      {!isDisabledManagerSelect && (
                        <Button
                          variant="outline"
                          className="hover:text-destructive-foreground bg-green-400 transition-colors hover:bg-[#a2eea8]"
                          onClick={handleSaveEmployee}
                        >
                          Установить сотрудника
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <div>Загрузка...</div>
            )}
            {/* Car Information */}
            <div>
              <h3 className="mb-2 text-xl font-medium">Автомобиль:</h3>
              <Card className="p-4">
                <h4 className="mb-3 text-lg font-medium">{deal?.car.brand + ' ' + deal?.car.model}</h4>
                <div className="mb-4 flex justify-center">
                  <div className="bg-muted flex aspect-video w-full max-w-md items-center justify-center">
                    <img
                      src={deal?.car.imgPath}
                      alt={`${deal?.car.brand} ${deal?.car.model}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div>
                    <p className="font-medium">Цвет:</p>
                    <p>{deal?.selectedOptions.color[0]?.name || 'Не указан'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Двигатель:</p>
                    <p>{deal?.selectedOptions.engine[0] || 'Не указан'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Комплектация:</p>
                    <p>{deal?.selectedConfiguration || 'Не указана'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Текущая цена:</p>
                    <div className="flex items-center justify-center gap-2">
                      <p>{deal?.price + ' (RUB)'}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-80">
          <div className="h-full">
            <ChatSection chatId={deal?.chatId ?? null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deal;

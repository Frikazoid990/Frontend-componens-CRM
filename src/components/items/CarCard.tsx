'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dealApiRoutes } from '@/constants/routes';
import { useSession } from '@/hooks/useSession';
import type { CarType } from '@/types/car.type';
import type { DealTypeOut } from '@/types/deal/dealOut.type';
import { ImageIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

interface CarCardProps {
  car: CarType;
}

export function CarCard({ car }: CarCardProps) {
  const [initialConfigName, initialConfig] = Object.entries(car.configurationOptions)[0];

  const user = useSession();

  const [selectedConfig, setSelectedConfig] = useState<string>(initialConfigName);
  const [selectedEngine, setSelectedEngine] = useState<string>(initialConfig.Engine[0]);
  const [selectedColor, setSelectedColor] = useState<string>(initialConfig.Color[0]);

  const [isShownBuyConfirmation, setIsShownBuyConfirmation] = useState<boolean>(false);

  const currentConfig = car.configurationOptions[selectedConfig];
  const availableConfigurations = Object.keys(car.configurationOptions).map(key => ({
    value: key,
    name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
  }));

  const handleConfigChange = (value: string) => {
    setSelectedConfig(value);
    setSelectedEngine(''); // Reset engine selection
    setSelectedColor(''); // Reset color selection
  };

  const confirmationHandler = () => {
    setIsShownBuyConfirmation(true);
  };

  const buyHandler = () => {
    if (!user) return;

    setIsShownBuyConfirmation(false);

    const request: DealTypeOut = {
      clientId: user.id, // Replace with actual client ID
      carId: car.id, // Assuming car has an id property
      selectedConfiguration: selectedConfig,
      selectedOptions: {
        Engine: selectedEngine,
        Price: currentConfig.Price,
        Color: selectedColor,
      },
    };

    const requestBody = JSON.stringify(request);

    fetch(import.meta.env.VITE_HOST + dealApiRoutes.addDeal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Deal created successfully:', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const testDriveHandler = () => {};

  return (
    <>
      <Card className="w-full max-w-4xl border-2 border-black">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="flex aspect-[4/3] items-center justify-center rounded bg-gray-200">
              <ImageIcon className="h-16 w-16 text-gray-500" />
            </div>
            {/* Details Section */}
            <div className="space-y-6">
              {/* Brand and Model */}
              <div>
                <h1 className="mb-1 text-4xl font-bold text-black">Honda</h1>
                <h2 className="text-2xl text-black">Civic</h2>
              </div>
              {/* Configuration */}
              <div className="space-y-2">
                <label className="text-lg font-medium text-black">Configuration:</label>
                <Select value={selectedConfig} onValueChange={handleConfigChange}>
                  <SelectTrigger className="w-48 border-2 border-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableConfigurations.map(config => (
                      <SelectItem key={config.value} value={config.value}>
                        {config.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Engine and Color Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Engine */}
                <div className="space-y-2">
                  <label className="text-lg font-medium text-black">Engine:</label>
                  <Select value={selectedEngine} onValueChange={setSelectedEngine}>
                    <SelectTrigger className="w-40 border-2 border-black">
                      <SelectValue placeholder="Select engine" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentConfig.Engine.map(engine => (
                        <SelectItem key={engine} value={engine}>
                          {engine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Color */}
                <div className="space-y-2">
                  <label className="text-lg font-medium text-black">Color:</label>
                  <div className="flex flex-wrap gap-2">
                    {currentConfig.Color.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`h-8 w-8 rounded-full border-2 transition-all hover:border-gray-500 ${color} ${
                          selectedColor === color ? 'border-gray-800 ring-2 ring-gray-400' : 'border-gray-300'
                        }`}
                        title={color}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-gray-600">
                      Selected: {currentConfig.Color.find(c => c === selectedColor)}
                    </p>
                  )}
                </div>
              </div>
              {/* Price and Actions */}
              <div className="flex items-end justify-between pt-4">
                <div className="text-right">
                  <div className="mb-1 text-lg font-medium text-black">Price:</div>
                  <div className="text-2xl font-bold text-black">${currentConfig.Price.toLocaleString()}</div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-2 border-blue-500 px-8 py-2 text-blue-500 hover:bg-blue-50"
                    disabled={!selectedEngine || !selectedColor}
                    onClick={confirmationHandler}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-blue-500 px-6 py-2 text-blue-500 hover:bg-blue-50"
                    disabled={!selectedEngine || !selectedColor}
                    onClick={testDriveHandler}
                  >
                    Test Drive
                  </Button>
                </div>
              </div>
              {/* Configuration Summary */}
              {(selectedEngine || selectedColor) && (
                <div className="mt-4 rounded border bg-gray-50 p-4">
                  <h3 className="mb-2 font-medium text-black">Your Selection:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>Configuration: {selectedConfig}</p>
                    {selectedEngine && <p>Engine: {selectedEngine}</p>}
                    {selectedColor && <p>Color: {selectedColor}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isShownBuyConfirmation} onOpenChange={setIsShownBuyConfirmation}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Подтверждение покупки</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-center text-lg">Вы точно хотите создать сделку по этому автомобилю?</p>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="font-semibold">
                {car.brand} {car.model}
              </p>
              <p className="text-sm text-gray-600">{selectedColor && `Цвет: ${selectedColor}`}</p>
              <p className="text-sm text-gray-600">{selectedEngine && `Двигатель: ${selectedEngine}`}</p>
              <p className="text-sm text-gray-600">{selectedConfig && `Комплектация: ${selectedConfig}`}</p>
            </div>
          </div>
          <DialogFooter className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsShownBuyConfirmation(false);
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                buyHandler();
              }}
            >
              Принять
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calendar Dialog */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Выберите дату тест-драйва</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={date => {
                setSelectedDate(date);
                if (date) {
                  setShowCalendar(false);
                  setShowTimeSlots(true);
                }
              }}
              disabled={date => date < new Date()}
              className="rounded-md border"
              locale={ru}
              weekStartsOn={1}
              formatters={{
                formatCaption: (date, options) => {
                  const month = date.toLocaleString('ru-RU', { month: 'long' });
                  const year = date.getFullYear();
                  return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
                },
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Time Slots Dialog */}
      <Dialog open={showTimeSlots} onOpenChange={setShowTimeSlots}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Выберите время
            </DialogTitle>
            {selectedDate && <p className="text-sm text-gray-600">{formatDateInRussian(selectedDate)}</p>}
          </DialogHeader>
          <div className="grid max-h-60 grid-cols-3 gap-2 overflow-y-auto py-4">
            {timeSlots.map(time => (
              <Button
                key={time}
                variant="outline"
                className="h-10 text-sm"
                onClick={() => {
                  setSelectedTime(time);
                  setShowTimeSlots(false);
                  setShowConfirmation(true);
                }}
              >
                {time}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Подтверждение записи на тест-драйв</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-center text-lg">Вы уверены, что хотите забронировать это время?</p>
            {selectedDate && selectedTime && (
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="font-semibold">
                  {brand} {model}
                </p>
                <p className="text-sm text-gray-600">{formatDateInRussian(selectedDate)}</p>
                <p className="text-sm text-gray-600">в {selectedTime}</p>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmation(false);
                setSelectedDate(undefined);
                setSelectedTime('');
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                setShowConfirmation(false);
                setSelectedDate(undefined);
                setSelectedTime('');
                // Here you would typically handle the booking confirmation
                alert('Тест-драйв успешно забронирован!');
              }}
            >
              Принять
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Buy Confirmation Dialog */}
      <Dialog open={showBuyConfirmation} onOpenChange={setShowBuyConfirmation}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Подтверждение покупки</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-center text-lg">Вы точно хотите создать сделку по этому автомобилю?</p>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="font-semibold">
                {brand} {model}
              </p>
              <p className="text-sm text-gray-600">{selectedColor && `Цвет: ${selectedColor}`}</p>
              <p className="text-sm text-gray-600">{selectedEngine && `Двигатель: ${selectedEngine}`}</p>
              <p className="text-sm text-gray-600">
                {selectedConfiguration && `Комплектация: ${selectedConfiguration}`}
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowBuyConfirmation(false);
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                setShowBuyConfirmation(false);
                // Here you would typically handle the purchase confirmation
                alert('Сделка успешно создана!');
              }}
            >
              Принять
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

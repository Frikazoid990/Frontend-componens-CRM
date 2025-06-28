'use client';

import { useState } from 'react';

import { createDealAction } from '@/actions/deal.action';
import { createTestDriveAction } from '@/actions/test_drive.action';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from '@/hooks/useSession';
import { cn } from '@/lib/utils';
import type { CarType, ColorType } from '@/types/car.type';
import type { DealTypeOut } from '@/types/deal/dealOut.type';
import type { TestDriveTypeOut } from '@/types/test-drive/test_drive.Out.type';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import BuyConfirmationDialog from './ui/BuyConfirmationDialog';
import TestDriveConfirmationDialog from './ui/TestDriveConfirmationDialog';

interface CarCardProps {
  car: CarType;
}

export function CarCard({ car }: CarCardProps) {
  console.log('car:', car);

  const [initialConfigName, initialConfig] = Object.entries(car.configurations)[0];

  const user = useSession();

  const [selectedConfig, setSelectedConfig] = useState<string>(initialConfigName);
  const [selectedEngine, setSelectedEngine] = useState<string | null>(initialConfig.engine[0]);
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(initialConfig.color[0]);

  const [isShownBuyConfirmation, setIsShownBuyConfirmation] = useState<boolean>(false);
  const [isShownTestDriveConfirmation, setIsShownTestDriveConfirmation] = useState<boolean>(false);

  const currentConfig = car.configurations[selectedConfig];
  const availableConfigurations = Object.keys(car.configurations).map(key => ({
    value: key,
    name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
  }));

  const handleConfigChange = (value: string) => {
    setSelectedConfig(value);
    setSelectedEngine(null); // Reset engine selection
    setSelectedColor(null); // Reset color selection
  };

  const buyHandler = () => {
    if (!user) return;

    setIsShownBuyConfirmation(false);

    if (!selectedEngine || !selectedColor) {
      return;
    }

    const request: DealTypeOut = {
      clientId: user.id, // Replace with actual client ID
      carId: car.id, // Assuming car has an id property
      selectedConfiguration: selectedConfig,
      selectedOptions: {
        engine: [selectedEngine], // оборачиваем в массив
        color: [selectedColor], // оборачиваем в массив
      },
    };

    createDealAction(request);
  };

  const confirmTestDriveHandler = (planedDate: Date) => {
    if (!user) return;

    setIsShownTestDriveConfirmation(false);
    const request: Omit<TestDriveTypeOut, 'id' | 'createdAt'> = {
      clientId: user.id, // Replace with actual client ID
      carId: car.id, // Assuming car has an id property
      planedDate: planedDate.toISOString(), // Replace with actual planned date
    };

    createTestDriveAction(request);
  };

  return (
    <>
      <Card className="w-full max-w-6xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Image Section */}
            <div className="flex aspect-square items-center justify-center rounded bg-gray-200">
              <img
                className="h-full w-full rounded object-cover"
                src={car.imgPath || '/placeholder.svg'}
                alt={`${car.brand} ${car.model}`}
              />
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              {/* Brand and Model */}
              <div>
                <h1 className="text-2xl font-bold text-black">{car.brand}</h1>
                <h2 className="text-xl text-gray-600">{car.model}</h2>
              </div>

              {/* Car Description */}
              {car.description && <div className="text-sm leading-relaxed text-gray-700">{car.description}</div>}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  className="bg-black px-6 py-2 text-white hover:bg-gray-800"
                  disabled={!selectedEngine || !selectedColor}
                  onClick={() => setIsShownBuyConfirmation(true)}
                >
                  Начать сделку
                </Button>

                <Button
                  variant="outline"
                  className="border-2 border-black px-6 py-2 text-black transition-all duration-200"
                  onClick={() => setIsShownTestDriveConfirmation(true)}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Тест-драйв
                </Button>
              </div>
            </div>

            {/* Configuration Section */}
            <div className="space-y-6">
              {/* Color */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-black">Цвет:</label>
                <div className="flex flex-wrap gap-2">
                  {currentConfig.color.map(clr => (
                    <button
                      key={clr.hex}
                      onClick={() => setSelectedColor(clr)}
                      className={cn(
                        'h-6 w-6 rounded-full border-2 transition-all hover:border-gray-500',
                        selectedColor?.hex === clr.hex ? 'border-gray-800 ring-2 ring-gray-400' : 'border-gray-300',
                      )}
                      style={{ backgroundColor: clr.hex }}
                      title={clr.name}
                    />
                  ))}
                </div>
              </div>

              <div>{selectedColor && <p>{selectedColor.name}</p>}</div>

              {/* Engine */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-black">Двигатель:</label>
                <Select value={selectedEngine ?? ''} onValueChange={setSelectedEngine}>
                  <SelectTrigger className="w-full rounded border border-gray-300">
                    <SelectValue placeholder="Выберите двигатель" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentConfig.engine.map(eg => (
                      <SelectItem key={eg} value={eg}>
                        {eg}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Configuration */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-black">Комплектация:</label>
                <Select value={selectedConfig} onValueChange={handleConfigChange}>
                  <SelectTrigger className="w-full rounded border border-gray-300">
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

              {/* Price */}
              <div className="pt-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-black">{currentConfig.price.toLocaleString()} (RUB)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isShownBuyConfirmation && (
        <BuyConfirmationDialog
          brand={car.brand}
          model={car.model}
          colorName={selectedColor?.name ?? 'Not select'}
          engine={selectedEngine}
          config={selectedConfig}
          isShown={isShownBuyConfirmation}
          setIsShown={setIsShownBuyConfirmation}
          onBuy={buyHandler}
          onCancel={() => setIsShownBuyConfirmation(false)}
        />
      )}

      {isShownTestDriveConfirmation && (
        <TestDriveConfirmationDialog
          isShown={isShownTestDriveConfirmation} // Replace with actual state to control visibility
          carId={car.id}
          brand={car.brand}
          model={car.model}
          setIsShown={setIsShownTestDriveConfirmation} // Replace with actual state handler
          onSubmit={confirmTestDriveHandler} // Replace with actual submit handler
          onCancel={() => setIsShownTestDriveConfirmation(false)} // Replace with actual cancel handler
        />
      )}
    </>
  );
}

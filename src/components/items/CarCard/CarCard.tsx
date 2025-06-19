'use client';

import { useState } from 'react';

import { createDealAction } from '@/actions/deal.action';
import { createTestDriveAction } from '@/actions/test_drive.action';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from '@/hooks/useSession';
import type { CarType } from '@/types/car.type';
import type { DealTypeOut } from '@/types/deal/dealOut.type';
import type { TestDriveTypeOut } from '@/types/test-drive/test_drive.Out.type';
import { ImageIcon } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import BuyConfirmationDialog from './ui/BuyConfirmationDialog';
import TestDriveConfirmationDialog from './ui/TestDriveConfirmationDialog';

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
  const [isShownTestDriveConfirmation, setIsShownTestDriveConfirmation] = useState<boolean>(false);

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

    createDealAction(request);
  };

  const confirmTestDriveHandler = (planedDate: Date) => {
    if (!user) return;

    setIsShownTestDriveConfirmation(false);

    const request: Omit<TestDriveTypeOut, 'id' | 'createdAt'> = {
      clientId: user.id, // Replace with actual client ID
      carId: car.id, // Assuming car has an id property
      planedDate: planedDate.toUTCString(), // Replace with actual planned date
    };

    createTestDriveAction(request);
  };

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
                    onClick={() => setIsShownBuyConfirmation(true)}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-blue-500 px-6 py-2 text-blue-500 hover:bg-blue-50"
                    disabled={!selectedEngine || !selectedColor}
                    onClick={() => setIsShownTestDriveConfirmation(true)}
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

      <BuyConfirmationDialog
        brand={car.brand}
        model={car.model}
        color={selectedColor}
        engine={selectedEngine}
        config={selectedConfig}
        isShown={isShownBuyConfirmation}
        setIsShown={setIsShownBuyConfirmation}
        onBuy={buyHandler}
        onCancel={() => setIsShownBuyConfirmation(false)}
      />

      <TestDriveConfirmationDialog
        isShown={isShownTestDriveConfirmation} // Replace with actual state to control visibility
        brand={car.brand}
        model={car.model}
        setIsShown={setIsShownTestDriveConfirmation} // Replace with actual state handler
        onSubmit={confirmTestDriveHandler} // Replace with actual submit handler
        onCancel={() => setIsShownTestDriveConfirmation(false)} // Replace with actual cancel handler
      />
    </>
  );
}

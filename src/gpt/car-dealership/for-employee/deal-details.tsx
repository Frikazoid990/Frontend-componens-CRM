'use client';

import { ChatSection } from '@/components/items/Chat/chat-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/gpt/kanban-board-components/app-sidebar';
import Honda from '@/img-car-page/HondaCivic.jpg';
import { Edit, User } from 'lucide-react';
import { useState } from 'react';

export default function ManagerDealPage() {
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [currentOffer, setCurrentOffer] = useState('3 000 000');

  const handleEditPrice = () => {
    setIsEditingPrice(true);
  };

  const handleSavePrice = () => {
    setIsEditingPrice(false);
    // Here you would typically save to backend
  };

  const handleCancelEdit = () => {
    setIsEditingPrice(false);
    setCurrentOffer('1 800 000'); // Reset to original value
  };

  const handleCancel = () => {
    // Handle deal cancellation
    console.log('Deal cancelled');
  };

  const handleComplete = () => {
    // Handle deal completion
    console.log('Deal completed');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex h-14 items-center justify-between border-b px-4">
            <h1 className="text-lg font-semibold">Автосалон "Автоцентр XXI"</h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </header>

          {/* Main Content */}
          <div className="flex flex-1 p-4">
            <div className="flex flex-1 gap-4">
              {/* Center Content */}
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-semibold"></h2>

                <div className="space-y-4">
                  {/* Deal Information */}
                  <Card className="p-4">
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Дата начала:</span> 20.07.2025
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Текущее предложение:</span>
                        {isEditingPrice ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={currentOffer}
                              onChange={e => setCurrentOffer(e.target.value)}
                              className="w-32"
                              placeholder="Enter amount"
                            />
                            <span className="text-muted-foreground text-sm">(RUB)</span>
                            <Button size="sm" onClick={handleSavePrice}>
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>{currentOffer} (RUB)</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleEditPrice}
                              className="hover:bg-accent hover:text-accent-foreground h-6 px-2 text-xs transition-colors"
                            >
                              <Edit className="mr-1 h-3 w-3" />
                              Редактировать
                            </Button>
                          </div>
                        )}
                      </div>
                      <p className="font-medium">Информация о клиенте:</p>
                      <p>
                        <span className="font-medium">ФИО:</span> Андрей Николаевич Агапов
                      </p>
                      <p>
                        <span className="font-medium">Телефонный номер:</span> +79293752231
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancel}
                          className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          Отмена
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleComplete}
                          className="bg-green-600 text-white transition-colors hover:bg-green-700"
                        >
                          Завершить
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Car Information */}
                  <div>
                    <h3 className="mb-2 text-xl font-medium">Автомобиль:</h3>
                    <Card className="p-4">
                      <h4 className="mb-3 text-lg font-medium">Honda Civic</h4>
                      <div className="mb-4 flex justify-center">
                        <div className="bg-muted flex aspect-video w-full max-w-md items-center justify-center">
                          <img src={Honda} alt="Honda Civic" className="h-full w-full object-cover" />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center text-sm">
                        <div>
                          <p className="font-medium">Цвет:</p>
                          <p>puprble</p>
                        </div>
                        <div>
                          <p className="font-medium">Двигатель:</p>
                          <p>V8</p>
                        </div>
                        <div>
                          <p className="font-medium">Комплектация:</p>
                          <p>Premium</p>
                        </div>
                        <div>
                          <p className="font-medium">Текущая цена:</p>
                          <div className="flex items-center justify-center gap-2">
                            <p>1 800 000 (RUB)</p>
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
                  <ChatSection />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

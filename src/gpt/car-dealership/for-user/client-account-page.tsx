import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function ClientAccountPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="flex items-center justify-between border-b px-4 py-3 lg:px-6">
        <a href="#" className="text-lg font-semibold" prefetch={false}>
          Some Car Company Ltd.
        </a>
        <nav className="hidden items-center space-x-4 md:flex">
          <a href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Ссылка на модели автомобилей
          </a>
          <a href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Личный кабинет
          </a>
        </nav>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-6 w-6" />
          <span className="sr-only">Личный аккаунт</span>
        </Button>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12"></main>
    </div>
  );
}

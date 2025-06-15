import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientAccountPage() {
  const currentDeal = {
    title: "SomeDealTitle",
    car: "Honda Civic",
    startDate: "22-11-1998",
    price: "19000$",
    image: "/placeholder.svg?height=30&width=50", // Маленькая картинка
  };

  const testDrives = [
    {
      id: 1,
      carModel: "Car Model",
      testDriveDate: "22-11-1998",
      manager: "Pushkin",
      image: "/placeholder.svg?height=30&width=50", // Маленькая картинка
    },
    {
      id: 2,
      carModel: "Car Model",
      testDriveDate: "22-11-1998",
      manager: "Pushkin",
      image: "/placeholder.svg?height=30&width=50",
    },
    {
      id: 3,
      carModel: "Car Model",
      testDriveDate: "22-11-1998",
      manager: "Pushkin",
      image: "/placeholder.svg?height=30&width=50",
    },
    {
      id: 4,
      carModel: "Car Model",
      testDriveDate: "22-11-1998",
      manager: "Pushkin",
      image: "/placeholder.svg?height=30&width=50",
    },
    {
      id: 5,
      carModel: "Car Model",
      testDriveDate: "22-11-1998",
      manager: "Pushkin",
      image: "/placeholder.svg?height=30&width=50",
    },
    {
      id: 6,
      carModel: "Car Model",
      testDriveDate: "22-11-1998",
      manager: "Pushkin",
      image: "/placeholder.svg?height=30&width=50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-4 py-3 border-b lg:px-6">
        <a href="#" className="text-lg font-semibold" prefetch={false}>
          Some Car Company Ltd.
        </a>
        <nav className="hidden md:flex items-center space-x-4">
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
      <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Сделка:</h2>
          <Card className="p-3 rounded-xl shadow-sm">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg font-semibold">{currentDeal.title}</CardTitle>
            </CardHeader>
            {/* Изображение находится в отдельном блоке */}
            <div className="mb-2">
              <img
                src={currentDeal.image || "/placeholder.svg"}
                alt="Изображение автомобиля"
                width={50}
                height={30}
                className="rounded-md object-cover w-[150px] h-[80px]"
              />
            </div>
            <CardContent className="p-0 flex flex-col gap-2">
              {/* Описание */}
              <div className="grid gap-1 text-sm">
                <p>
                  <span className="font-medium">Автомобиль:</span> {currentDeal.car}
                </p>
                <p>
                  <span className="font-medium">Дата начала:</span> {currentDeal.startDate}
                </p>
              </div>
              {/* Цена */}
              <div className="flex items-center justify-between">
                <p>
                  <span className="font-medium">Цена:</span> {currentDeal.price}
                </p>
                {/* Кнопка "Подробнее" */}
                <Button variant="outline" size="sm">
                  Подробнее
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Тест-драйвы:</h2>
          <div className="grid gap-4 max-h-[350px] overflow-y-auto pr-2">
            {testDrives.map((drive) => (
              <Card key={drive.id} className="p-3 rounded-xl shadow-sm">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-lg font-semibold">{drive.carModel}</CardTitle>
                </CardHeader>
                {/* Изображение находится в отдельном блоке */}
                <div className="mb-2">
                  <img
                    src={drive.image || "/placeholder.svg"}
                    alt="Изображение автомобиля"
                    width={50}
                    height={30}
                    className="rounded-md object-cover w-[50px] h-[30px]"
                  />
                </div>
                <CardContent className="p-0 flex flex-col gap-2">
                  {/* Описание */}
                  <div className="grid gap-1 text-sm">
                    <p>
                      <span className="font-medium">Дата тест-драйва:</span> {drive.testDriveDate}
                    </p>
                    <p>
                      <span className="font-medium">Ваш менеджер:</span> {drive.manager}
                    </p>
                  </div>
                  {/* Кнопка "Подробнее" */}
                  <Button variant="outline" size="sm" className="w-full">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
import { AppSidebar } from "@/components/test-drive-board-details-for-manager/app-sidebar"
import { TestDriveSection } from "@/components/test-drive-board-details-for-manager/test-drive-section"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Plus, User } from "lucide-react"

// Mock data for test drives
const mockTestDrives = {
  notAssigned: [
    {
      id: "1",
      client: "Александр Андреевич Петров",
      date: "17.08.2025",
      time: "10:30",
      car: "Honda Accord",
    },
    {
      id: "2",
      client: "Мария Сергеевна Волкова",
      date: "18.08.2025",
      time: "11:00",
      car: "Toyota Camry",
    },
    {
      id: "3",
      client: "Дмитрий Иванович Козлов",
      date: "19.08.2025",
      time: "14:30",
      car: "BMW X5",
    },
    {
      id: "4",
      client: "Елена Петровна Смирнова",
      date: "20.08.2025",
      time: "16:00",
      car: "Mercedes-Benz C-Class",
    },
    {
      id: "5",
      client: "Сергей Александрович Морозов",
      date: "21.08.2025",
      time: "09:30",
      car: "Audi A4",
    },
    {
      id: "6",
      client: "Наталья Владимировна Федорова",
      date: "22.08.2025",
      time: "17:00",
      car: "Volkswagen Passat",
    },
  ],
  inProgress: [
    {
      id: "7",
      client: "Павел Николаевич Орлов",
      employee: "Анна Сергеевна Кузнецова",
      date: "15.08.2025",
      time: "13:30",
      car: "Hyundai Elantra",
    },
    {
      id: "8",
      client: "Ирина Михайловна Попова",
      employee: "Виктор Петрович Соколов",
      date: "16.08.2025",
      time: "15:00",
      car: "Kia Optima",
    },
    {
      id: "9",
      client: "Алексей Дмитриевич Новиков",
      employee: "Ольга Ивановна Лебедева",
      date: "16.08.2025",
      time: "12:00",
      car: "Nissan Altima",
    },
    {
      id: "10",
      client: "Светлана Андреевна Романова",
      employee: "Михаил Сергеевич Петров",
      date: "17.08.2025",
      time: "09:00",
      car: "Ford Mondeo",
    },
  ],
  completed: [
    {
      id: "11",
      client: "Олег Петрович Реткин",
      employee: "Кирилл Андреевич Аскульчев",
      date: "11.08.2025",
      time: "10:00",
      car: "Ford Focus 3",
    },
    {
      id: "12",
      client: "Татьяна Владимировна Громова",
      employee: "Денис Александрович Волков",
      date: "10.08.2025",
      time: "11:30",
      car: "Chevrolet Cruze",
    },
    {
      id: "13",
      client: "Роман Сергеевич Зайцев",
      employee: "Екатерина Николаевна Орлова",
      date: "09.08.2025",
      time: "14:00",
      car: "Mazda 6",
    },
    {
      id: "14",
      client: "Юлия Петровна Макарова",
      employee: "Андрей Михайлович Степанов",
      date: "08.08.2025",
      time: "16:30",
      car: "Subaru Legacy",
    },
    {
      id: "15",
      client: "Константин Иванович Белов",
      employee: "Марина Дмитриевна Козлова",
      date: "07.08.2025",
      time: "17:30",
      car: "Lexus ES",
    },
    {
      id: "16",
      client: "Анастасия Сергеевна Титова",
      employee: "Сергей Владимирович Никитин",
      date: "06.08.2025",
      time: "15:30",
      car: "Infiniti Q50",
    },
    {
      id: "17",
      client: "Максим Александрович Фролов",
      employee: "Елена Петровна Михайлова",
      date: "05.08.2025",
      time: "13:00",
      car: "Acura TLX",
    },
  ],
  cancelled: [
    {
      id: "18",
      client: "Вадим Николаевич Карпов",
      employee: "Игорь Сергеевич Антонов",
      date: "12.08.2025",
      time: "12:30",
      car: "Skoda Octavia",
    },
    {
      id: "19",
      client: "Галина Ивановна Сидорова",
      date: "13.08.2025",
      time: "09:00",
      car: "Peugeot 508",
    },
    {
      id: "20",
      client: "Артём Дмитриевич Логинов",
      employee: "Надежда Александровна Павлова",
      date: "14.08.2025",
      time: "10:30",
      car: "Renault Talisman",
    },
    {
      id: "21",
      client: "Вера Петровна Медведева",
      date: "15.08.2025",
      time: "11:00",
      car: "Opel Insignia",
    },
  ],
}

export default function TestDriveDashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold">Панель управления</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
          <div className="p-4">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Создать тест-драйв
          </Button>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            <TestDriveSection title="Не назначенные тест-драйвы:" testDrives={mockTestDrives.notAssigned} />
            <TestDriveSection title="Тест-драйвы в процессе:" testDrives={mockTestDrives.inProgress} />
            <TestDriveSection title="Завершённые тест-драйвы:" testDrives={mockTestDrives.completed} />
            <TestDriveSection title="Отменённые тест-драйвы:" testDrives={mockTestDrives.cancelled} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
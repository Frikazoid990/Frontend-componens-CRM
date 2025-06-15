import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from "@/gpt/kanban-board-components/app-sidebar"
import { KanbanBoard } from "@/gpt/kanban-board-components/kanban-board"
import { Plus } from "lucide-react"

export default function ManagerDashboardPage() {
  const initialKanbanColumns = [
    {
      id: "initial",
      title: "Начало",
      deals: [
        {
          id: "deal-1",
          customer: "Андрей Николаевич Агапов",
          car: "Honda Civic Premium",
          date: "20.07.2025",
          price: "1 800 000,00 (RUB)",
          company: "Автоцентр XXI",
        },
      ],
    },
    {
      id: "consultation",
      title: "Консультация",
      deals: [],
    },
    {
      id: "signing",
      title: "Подписание договора",
      deals: [
        {
          id: "deal-2",
          customer: "Андрей Петрович Котов",
          car: "Toyota Camry Luxe",
          date: "05.06.2025",
          price: "5 250 117,23 (RUB)",
          company: "Автоцентр XXI",
        },
      ],
    },
    {
      id: "car-delivered",
      title: "Ожидание доставки",
      deals: [],
    },
    {
      id: "completed",
      title: "Завершение",
      deals: [],
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex flex-col w-full">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b bg-white">
          <h1 className="text-xl font-bold">
            <span className="text-blue-600">Автосалон "Автоцентр XXI"</span> 
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Эдуард Евгеньевич Крылов</span>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>ЭЕ</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Сайдбар */}
          <AppSidebar />

          {/* Основной контент */}
          <main className="flex-1 p-6 bg-gray-50 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Канбан-доска</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Добавить сделку
              </Button>
            </div>

            {/* Канбан-доска */}
            <KanbanBoard initialColumns={initialKanbanColumns} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function TestDriveDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Some Car Company Ltd.</h1>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary">
              Car Models Link
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Personal Office Link
            </a>
          </nav>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <span className="sr-only">User Avatar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Maksim Scerbuk</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="text-3xl font-semibold mb-6">Test Drive Details Page</h2>

        {/* Test Drive Information Section */}
        <div className="border border-gray-300 p-6 mb-8 rounded-lg">
          <p className="text-lg mb-2">
            <span className="font-medium">Дата проведения:</span> 15.06.2025
          </p>
          <p className="text-lg mb-2">
            <span className="font-medium">Время проведения:</span> 12:30
          </p>
          <p className="text-lg mb-2">
            <span className="font-medium">Ответственный менеджер:</span> Эдуард Евгеньевич Крылов
          </p>
          <p className="text-lg">
            <span className="font-medium">Машина:</span> Toyota <span className="font-medium ml-4">Модель:</span> Camry
          </p>
        </div>

        {/* Promo Text Section */}
        <div className="border border-gray-300 p-6 h-64 flex items-center justify-center text-center text-lg text-muted-foreground rounded-lg">
          Some Promo Text with Links to other cars
        </div>
      </main>
    </div>
  )
}
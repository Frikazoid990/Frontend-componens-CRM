import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TestDriveCardProps {
  client: string
  employee?: string
  date: string
  car: string
  time?:string
}

export function TestDriveCard({ client, employee, date, time , car }: TestDriveCardProps) {
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 grid grid-cols-4 gap-4 min-w-0">
            <div className="min-w-0">
              <p className="text-sm font-medium mb-1">Клиент:</p>
              <p className="text-sm text-muted-foreground truncate" title={client}>
                {client}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium mb-1">Ответственный:</p>
              <p className="text-sm text-muted-foreground truncate" title={employee || "---"}>
                {employee || "---"}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium mb-1">Дата:</p>
              <p className="text-sm text-muted-foreground truncate">{date}</p>
                        </div>
                        <div className="min-w-0">
              <p className="text-sm font-medium mb-1">Время:</p>
              <p className="text-sm text-muted-foreground truncate">{time}</p>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium mb-1">Машина:</p>
              <p className="text-sm text-muted-foreground truncate" title={car}>
                {car}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <Button  size="sm" className="w-24">
              Подробности
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

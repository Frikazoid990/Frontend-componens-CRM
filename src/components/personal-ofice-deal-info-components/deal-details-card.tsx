import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DealDetailsCardProps {
  startDate: string
  manager: string
  currentOffer: string
}

export function DealDetailsCard({ startDate, manager, currentOffer }: DealDetailsCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Информация о сделке</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <span className="font-medium">Дата начла сделки:</span> {startDate}
        </p>
        <p>
          <span className="font-medium">Ответственный менеджер:</span> {manager}
        </p>
        <p>
          <span className="font-medium">Текущая цена:</span> {currentOffer}
        </p>
      </CardContent>
    </Card>
  )
}

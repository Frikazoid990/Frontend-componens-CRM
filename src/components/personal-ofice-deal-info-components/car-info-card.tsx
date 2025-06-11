
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CarInfoCardProps {
  carName: string
  imageUrl: string
  color: string
  engine: string
  configuration: string
  currentPrice: string
}

export function CarInfoCard({ carName, imageUrl, color, engine, configuration, currentPrice }: CarInfoCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{carName}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative h-40 w-full overflow-hidden rounded-md bg-muted">
				<img
				src={imageUrl || "/placeholder.svg"}
				alt={`${carName} image`}
				className="h-full w-full object-cover opacity-50 transition-opacity hover:opacity-100"
				/>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
          <div>
            <span className="font-medium">Цвет:</span> {color}
          </div>
          <div>
            <span className="font-medium">Двигатель:</span> {engine}
          </div>
          <div>
            <span className="font-medium">Комплектация:</span> {configuration}
          </div>
          <div>
            <span className="font-medium">Текущая цена:</span> {currentPrice}
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="link" className="p-0 h-auto">
            Показать
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

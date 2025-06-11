"use client"

import { ru } from "date-fns/locale"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock } from "lucide-react"

interface CarCardProps {
  brand: string
  model: string
  description: string
  imageSrc: string
  colors: { name: string; hex: string }[]
  engineOptions: string[]
  configurationOptions: string[]
}

export function CarCard({
  brand,
  model,
  description,
  imageSrc,
  colors,
  engineOptions,
  configurationOptions,
}: CarCardProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || "")
  const [selectedEngine, setSelectedEngine] = useState(engineOptions[0] || "")
  const [selectedConfiguration, setSelectedConfiguration] = useState(configurationOptions[0] || "")

  const [showCalendar, setShowCalendar] = useState(false)
  const [showTimeSlots, setShowTimeSlots] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  // Format date in Russian format
  const formatDateInRussian = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="border rounded-lg p-4 grid gap-4 md:grid-cols-[200px_1fr_200px] lg:grid-cols-[250px_1fr_250px] items-start">
      <div className="flex justify-center items-center h-48 w-full bg-gray-100 rounded-md overflow-hidden md:h-auto">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={`${brand} ${model}`}
          width={200}
          height={150}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="grid gap-2 md:pl-4">
        <h2 className="text-2xl font-bold">{brand}</h2>
        <h3 className="text-lg text-gray-600">{model}</h3>
        <p className="text-sm text-gray-700">{description}</p>
        <div className="flex gap-2 mt-4">
          <Button variant="default">Купить</Button>
          <Button variant="outline" onClick={() => setShowCalendar(true)}>
            <CalendarDays className="w-4 h-4 mr-2" />
            Тест-драйв
          </Button>
        </div>
      </div>
      <div className="grid gap-4 border rounded-md p-4 md:ml-4">
        <div className="grid gap-2">
          <Label htmlFor={`color-${brand}-${model}`}>Цвет:</Label>
          <div className="flex gap-2" id={`color-${brand}-${model}`}>
            {colors.map((color) => (
              <div
                key={color.name}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                  selectedColor === color.name ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color.name)}
                role="radio"
                aria-checked={selectedColor === color.name}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`engine-${brand}-${model}`}>Двигатель:</Label>
          <Select value={selectedEngine} onValueChange={setSelectedEngine}>
            <SelectTrigger id={`engine-${brand}-${model}`}>
              <SelectValue placeholder="Выберите двигатель" />
            </SelectTrigger>
            <SelectContent>
              {engineOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`configuration-${brand}-${model}`}>Комплектация:</Label>
          <Select value={selectedConfiguration} onValueChange={setSelectedConfiguration}>
            <SelectTrigger id={`configuration-${brand}-${model}`}>
              <SelectValue placeholder="Выберите комплектацию" />
            </SelectTrigger>
            <SelectContent>
              {configurationOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Calendar Dialog */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Выберите дату тест-драйва</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date)
                if (date) {
                  setShowCalendar(false)
                  setShowTimeSlots(true)
                }
              }}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
              locale={ru}
              weekStartsOn={1}
              formatters={{
                formatCaption: (date) => {
                  const month = date.toLocaleString("ru-RU", { month: "long" })
                  const year = date.getFullYear()
                  return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`
                },
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Time Slots Dialog */}
      <Dialog open={showTimeSlots} onOpenChange={setShowTimeSlots}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Выберите время
            </DialogTitle>
            {selectedDate && <p className="text-sm text-gray-600">{formatDateInRussian(selectedDate)}</p>}
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2 py-4 max-h-60 overflow-y-auto">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant="outline"
                className="h-10 text-sm"
                onClick={() => {
                  setSelectedTime(time)
                  setShowTimeSlots(false)
                  setShowConfirmation(true)
                }}
              >
                {time}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Подтверждение записи на тест-драйв</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-lg mb-4">Вы уверены, что хотите забронировать это время?</p>
            {selectedDate && selectedTime && (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">
                  {brand} {model}
                </p>
                <p className="text-sm text-gray-600">{formatDateInRussian(selectedDate)}</p>
                <p className="text-sm text-gray-600">в {selectedTime}</p>
              </div>
            )}
          </div>
          <DialogFooter className="flex gap-2 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmation(false)
                setSelectedDate(undefined)
                setSelectedTime("")
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                setShowConfirmation(false)
                setSelectedDate(undefined)
                setSelectedTime("")
                // Here you would typically handle the booking confirmation
                alert("Тест-драйв успешно забронирован!")
              }}
            >
              Принять
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

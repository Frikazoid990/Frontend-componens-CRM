"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as React from "react"

export function TestDriveDetailsCard() {
  const [status, setStatus] = React.useState("COMPLETED")

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Детальная страница управления тест-драйвом</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <p className="text-sm font-medium">
            Дата тест-драйва: <span className="font-normal">22.07.2025</span>
          </p>
          <p className="text-sm font-medium">
            Автомобиль: <span className="font-normal">Honda Civic</span>
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Статус тест-драйва:</p>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NOTASSIGNED">Не назначен</SelectItem>
                <SelectItem value="INITIAL">В процессе</SelectItem>
                <SelectItem value="COMPLETED">Завершён</SelectItem>
                <SelectItem value="CANCELED">Отменён</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <p className="text-sm font-medium">Информация о клиенте:</p>
          <p className="text-sm font-medium ml-4">
            Полное имя: <span className="font-normal">Александр Иванович Селезнёв</span>
          </p>
          <p className="text-sm font-medium ml-4">
            Номер телефона: <span className="font-normal">+7 (999) 888-77-66</span>
          </p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Отменить
          </Button>
          <Button className="bg-green-500 text-white hover:bg-green-600">Сохранить изменения</Button>
        </div>
      </CardContent>
    </Card>
  )
}
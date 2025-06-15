import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  id: number
  sender: "Вы:" | "Менеджер:"
  text: string
  timestamp: string
}

export function ChatSection() {
    const messages: Message[] = [
    {
      id: 3,
      sender: "Вы:",
      text: "Можно уточнить условия покупки в кредит?",
      timestamp: "10:28",
    },
    {
      id: 4,
      sender: "Менеджер:",
      text: "Мы предлагаем выгодные условия кредитования — ставка от 4.9%, первый взнос от 15%.",
      timestamp: "10:30",
    },
  ]

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Чат</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between p-4">
        <div className="flex-1 overflow-y-auto rounded-md border p-4 mb-4 h-[400px]">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.sender === "Вы:" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                  message.sender === "Вы:" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Input placeholder="Ваше сообщение..." className="flex-1" />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

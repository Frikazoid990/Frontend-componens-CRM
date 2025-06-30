import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  sender: 'Вы:' | 'Клиент:';
  text: string;
  timestamp: string;
}

interface ChatProps {
  chatId: number | null;
}

export function ChatSection({ chatId }: ChatProps) {
  const messages: Message[] = [
    {
      id: 3,
      sender: 'Клиент:',
      text: 'Можно уточнить условия покупки в кредит? ',
      timestamp: '10:28',
    },
    {
      id: 4,
      sender: 'Вы:',
      text: 'Мы предлагаем выгодные условия кредитования — ставка от 4.9%, первый взнос от 15%.',
      timestamp: '10:30',
    },
  ];

  // useChatMessages({ chatId, onMessageReceived: handleNewMessage });
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Чат</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between p-4">
        <div className="mb-4 h-[400px] flex-1 overflow-y-auto rounded-md border p-4">
          {messages.map(message => (
            <div key={message.id} className={`mb-4 ${message.sender === 'Вы:' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'Вы:' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <p className="mt-1 text-xs text-gray-500">{message.timestamp}</p>
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
  );
}

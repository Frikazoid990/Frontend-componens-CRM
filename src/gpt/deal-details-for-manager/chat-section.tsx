import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks/useChatMessages';
import { useSession } from '@/hooks/useSession';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  const [innerChatId, setInnerChatId] = useState(chatId);
  const user = useSession();

  useEffect(() => {
    setInnerChatId(chatId);
  }, [chatId]);

  const [inputValue, setInputValue] = useState('');
  const { messages, isConnected, error, sendMessage } = useChat(innerChatId);

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
                <p className="text-sm">{message.content}</p>
              </div>
              <p className="mt-1 text-xs text-gray-500">{new Date(message.createdAt).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Input
            placeholder="Ваше сообщение..."
            className="flex-1"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <Button
            size="icon"
            onClick={() => {
              sendMessage(inputValue);
              setInputValue('');
            }}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        {error && (
          <p className="rounded-md bg-[#fcc5c5] px-3 py-1 text-red-900 shadow-sm outline outline-slate-100">{error}</p>
        )}
      </CardFooter>
    </Card>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks/useChatMessages';
import { useSession } from '@/hooks/useSession';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MessageItem from './ui/MessageItem';

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
  const lastMassageRef = useRef<HTMLDivElement | null>(null);
  const user = useSession();

  useEffect(() => {
    setInnerChatId(chatId);
  }, [chatId]);

  const { messages, isConnected, error, sendMessage, inputValue, setInputValue } = useChat(innerChatId);

  useEffect(() => {
    if (lastMassageRef.current !== null) {
      lastMassageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Чат</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between p-4">
        <div className="mb-4 h-[400px] max-h-[580px] flex-1 overflow-y-auto rounded-md border p-4">
          {messages.map((message, index) => (
            <MessageItem
              messagesLength={messages.length}
              index={index}
              message={message}
              userFullName={user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? 'user'}
              ref={lastMassageRef}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Input
            placeholder="Ваше сообщение..."
            className="flex-1"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                sendMessage();
                setInputValue('');
              }
            }}
          />
          <Button
            size="icon"
            onClick={() => {
              sendMessage();
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

// src/hooks/useChatMessages.ts
import * as signalR from '@microsoft/signalr';
import { useCallback, useEffect, useState } from 'react';
import { useSession } from './useSession';

interface Message {
  id: string;
  content: string;
  sender: string;
  createdAt: string;
}

interface UseChatReturn {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  // joinChat: (chatId: number) => Promise<void>;
  isConnected: boolean;
  error: string | null;
}

export const useChat = (chatId: number | null): UseChatReturn => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSession();

  useEffect(() => {
    console.log('chatId', chatId);
  }, [chatId]);

  // Подключение к чату
  const joinChat = useCallback(
    async (chatId: number | null) => {
      if (chatId === null) {
        // setError('Connection is not allowed, need chatId');
        // console.error('Connection is not allowed, need chatId');
        return;
      }
      if (!connection) {
        setError('Connection not established');
        return;
      }

      try {
        await connection.invoke('JoinToChat', chatId);
      } catch (err) {
        setError('Failed to join chat');
        console.error('Join chat failed:', err);
      }
    },
    [connection, chatId],
  );

  // Инициализация подключения
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        import.meta.env.VITE_API_URL + '/chat',
        //   {
        //   // Добавьте токен авторизации, если требуется
        //   accessTokenFactory: () => localStorage.getItem('token') || '',
        // }
      )

      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  // Подписка на события
  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        setIsConnected(true);
        setError(null);

        joinChat(chatId);
      } catch (err) {
        setError('Failed to connect to chat');
        console.error('Connection failed:', err);
      }
    };

    startConnection();

    connection.on('ReceiveMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    connection.on('ReceiveMessageHistory', (history: Message[]) => {
      setMessages(history);
    });

    // connection.on('UserJoined', (userId: string) => {
    //   // Можно добавить уведомление о новом пользователе
    //   console.log(`User ${userId} joined the chat`);
    // });

    connection.onclose(() => {
      setIsConnected(false);
    });

    connection.onreconnecting(() => {
      setIsConnected(false);
    });

    connection.onreconnected(() => {
      setIsConnected(true);
    });

    return () => {
      connection.off('ReceiveMessage');
      connection.off('ReceiveMessageHistory');
      // connection.off('UserJoined');
    };
  }, [connection, chatId]);

  // Отправка сообщения
  const sendMessage = useCallback(
    async (content: string) => {
      if (!connection || !isConnected) {
        setError('Not connected to chat');
        return;
      }

      try {
        await connection.invoke('SendMessage', chatId, content, user?.id);
      } catch (err) {
        setError('Failed to send message');
        console.error('Send message failed:', err);
      }
    },
    [connection, isConnected],
  );

  return {
    messages,
    sendMessage,
    // joinChat,
    isConnected,
    error,
  };
};
// export const useChatMessages = ({ chatId }: UseChatMessagesProps) => {

//   const [messages, setMessages] = useState<UserMessageType[]>([])

//   useEffect(() => {
//     const setupSignalR = async () => {
//       if (chatConnection.state === signalR.HubConnectionState.Disconnected) {
//         await chatConnection.start();
//       }

//       await joinChatGroup(chatId);

//       chatConnection.on('ReceiveMessage', (message: string) => {
//         onMessageReceived(message);
//       });
//     };

//     setupSignalR();

//     return () => {
//       chatConnection.off('ReceiveMessage');
//     };
//   }, [chatId, onMessageReceived]);

//   const onSendMessage = (sendedMessage: string) =>{

//     setMessages(prev => [...prev, sendedMessage])
//   }

//   return {
//     messages, onSendMessage
//   }
// };

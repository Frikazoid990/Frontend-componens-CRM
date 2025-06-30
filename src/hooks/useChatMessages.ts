// src/hooks/useChatMessages.ts
import * as signalR from '@microsoft/signalr';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  isConnected: boolean;
  error: string | null;
}

export const useChat = (chatId: number | null): UseChatReturn => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const session = useSession();
  const userId = session?.id;

  // Initialize and manage the SignalR connection once
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/chat`)
      .withAutomaticReconnect()
      // .configureLogging(signalR.LogLevel.Warn)
      .build();

    connectionRef.current = connection;

    // Start connection
    connection
      .start()
      .then(() => {
        setError(null);
        setIsConnected(true);
      })
      .catch(() => setError('Failed to connect to chat'));

    // Register handlers
    connection.on('ReceiveMessage', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    connection.on('ReceiveMessageHistory', (history: Message[]) => {
      setMessages(history);
    });

    connection.onreconnecting(() => {
      setIsConnected(false);
    });

    connection.onreconnected(() => {
      setIsConnected(true);
      // Rejoin room if needed
      if (chatId !== null) {
        connection.invoke('JoinToChat', chatId).catch(() => {
          setError('Failed to rejoin chat');
        });
      }
    });

    connection.onclose(() => {
      setIsConnected(false);
    });

    return () => {
      // Cleanup handlers and stop connection
      connection.off('ReceiveMessage');
      connection.off('ReceiveMessageHistory');
      connection.stop();
    };
  }, [chatId]);

  // Join chat room on chatId change
  useEffect(() => {
    const connection = connectionRef.current;
    if (!connection || !isConnected || chatId === null) return;

    connection.invoke('JoinToChat', chatId).catch(() => setError('Failed to join chat'));
  }, [chatId, isConnected]);

  /**
   * Send a message to the current chat room.
   * @param content - The text content of the message.
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!connectionRef.current || !isConnected) {
        setError('Not connected to chat');
        return;
      }
      if (chatId === null || !userId) {
        setError('Invalid chat or user session');
        return;
      }

      try {
        await connectionRef.current.invoke('SendMessage', chatId, content, userId);
      } catch {
        setError('Failed to send message');
      }
    },
    [chatId, isConnected, userId],
  );

  return { messages, sendMessage, isConnected, error };
};

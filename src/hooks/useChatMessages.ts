// src/hooks/useChatMessages.ts
import signalR from '@microsoft/signalr';
import { useEffect } from 'react';
import { chatConnection, joinChatGroup } from './signalrClient';

interface UseChatMessagesProps {
  chatId: number | null;
  onMessageReceived: (message: string) => void;
}

export const useChatMessages = ({ chatId, onMessageReceived }: UseChatMessagesProps) => {
  useEffect(() => {
    const setupSignalR = async () => {
      if (chatConnection.state === signalR.HubConnectionState.Disconnected) {
        await chatConnection.start();
      }

      await joinChatGroup(chatId);

      chatConnection.on('ReceiveMessage', (message: string) => {
        onMessageReceived(message);
      });
    };

    setupSignalR();

    return () => {
      chatConnection.off('ReceiveMessage');
    };
  }, [chatId, onMessageReceived]);
};

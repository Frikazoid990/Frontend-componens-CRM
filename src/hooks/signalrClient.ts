// src/services/signalrClient.ts
import * as signalR from '@microsoft/signalr';

const API_URL = import.meta.env.VITE_API_URL;

export const chatConnection = new signalR.HubConnectionBuilder()
  .withUrl(`${API_URL}/chat`, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .withAutomaticReconnect()
  .build();

export const startChatConnection = async () => {
  try {
    await chatConnection.start();
    console.log('SignalR: Соединение установлено');
  } catch (error) {
    console.error('SignalR: Ошибка при подключении', error);
  }
};

export const joinChatGroup = async (chatId: number) => {
  try {
    await chatConnection.invoke('JoinToChatAsync', chatId);
    console.log(`Присоединились к чату ${chatId}`);
  } catch (error) {
    console.error(`Не удалось присоединиться к чату ${chatId}`, error);
  }
};

export const sendMessageToChat = async (chatId: number, userName: string, message: string) => {
  try {
    await chatConnection.invoke('SendMessage', chatId, userName, message);
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error);
  }
};

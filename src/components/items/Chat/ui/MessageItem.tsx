import type { Message } from '@/hooks/useChatMessages';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  messagesLength: number;
  index: number;
  message: Message;
  userFullName: string;
  ref: React.Ref<HTMLDivElement>;
}

const MessageItem = ({ message, index, messagesLength, userFullName, ref }: Props) => {
  const nameParts = message.sendler.split(' ');
  const formattedName = `${nameParts[0]}${nameParts[1] ? ` ${nameParts[1].slice(0, 1)}.` : ''}${nameParts[2] ? ` ${nameParts[2].slice(0, 1)}.` : ''}`;

  const isOwnerMessage = message.sendler === userFullName;
  return (
    <div
      ref={index === messagesLength - 1 ? ref : undefined}
      className={`mb-4 ${isOwnerMessage ? 'text-right' : 'text-left'}`}
    >
      <div className={cn('mb-1 text-sm font-semibold', isOwnerMessage ? 'text-blue-500' : 'text-slate-400')}>
        {formattedName}
      </div>
      <div
        className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
          message.sendler === 'Вы:' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>

      <p className="mt-1 text-xs text-gray-500">{new Date(message.createdAt).toLocaleTimeString()}</p>
    </div>
  );
};

export default MessageItem;

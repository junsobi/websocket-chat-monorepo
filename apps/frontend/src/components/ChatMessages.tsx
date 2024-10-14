import React from "react";
import { ChatMessagesProps } from "@/types/chat";

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  messageEndRef,
}) => {
  return (
    <div className="border p-4 h-48 overflow-y-auto mb-4 bg-gray-50 rounded">
      <h3 className="font-bold text-lg mb-2">채팅 메시지</h3>
      {messages.map((msg, index) => (
        <div key={index} className="text-sm mb-1">
          <strong>{msg.user}:</strong> {msg.text}{" "}
          <span className="text-xs text-gray-500">
            ({new Date(msg.timestamp).toLocaleTimeString()})
          </span>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatMessages;

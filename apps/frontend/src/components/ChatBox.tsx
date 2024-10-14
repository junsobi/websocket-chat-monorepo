import React, { useState, useEffect, useRef } from "react";
import { ChatBoxProps } from "@/types/chat";
import ChatMessages from "./ChatMessages";
import LogViewer from "./LogViewer";
import MessageInput from "./MessageInput";
import { useWebSocket } from "@/hooks/useWebsocket";

const ChatBox: React.FC<ChatBoxProps> = ({ user, serverUrl }) => {
  const [input, setInput] = useState("");
  const { messages, logs, sendMessage } = useWebSocket(serverUrl, user);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        {user} 채팅방
      </h2>

      <ChatMessages messages={messages} messageEndRef={messageEndRef} />
      <LogViewer logs={logs} />
      <MessageInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatBox;

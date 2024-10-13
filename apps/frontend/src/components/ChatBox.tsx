import React, { useState } from "react";
import { useWebSocket } from "@/hooks/useWebsocket";

type User = "User1" | "User2";

const ChatBox: React.FC<{ user: User; serverUrl: string }> = ({
  user,
  serverUrl,
}) => {
  const [input, setInput] = useState("");
  const { messages, logs, sendMessage } = useWebSocket(serverUrl, user);

  const handleSendMessage = () => {
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="w-1/2 p-4 border-r">
      <h2 className="text-xl font-bold mb-2">{user}</h2>

      <div className="border p-4 h-40 overflow-y-auto mb-4 bg-white">
        <h3 className="font-bold">채팅 메시지</h3>
        {messages.map((msg, index) => (
          <div key={index} className="text-sm mb-1">
            {msg}
          </div>
        ))}
      </div>

      <div className="border p-4 h-40 overflow-y-auto mb-4 bg-gray-50">
        <h3 className="font-bold">연결 로그</h3>
        {logs.map((log, index) => (
          <div key={index} className="text-xs text-gray-600">
            {log}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-grow border rounded-l px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

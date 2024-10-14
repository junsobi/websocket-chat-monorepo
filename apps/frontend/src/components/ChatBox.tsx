import React, { useState, useEffect, useRef } from "react";
import { useWebSocket } from "@/hooks/useWebsocket";

type User = "User1" | "User2";

const ChatBox: React.FC<{ user: User; serverUrl: string }> = ({
  user,
  serverUrl,
}) => {
  const [input, setInput] = useState("");
  const { messages, logs, sendMessage } = useWebSocket(serverUrl, user);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const isComposing = useRef(false); // IME 입력 상태 추적

  // 새로운 메시지가 추가될 때 자동 스크롤
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IME 조합 중이 아닐 때만 메시지 전송
    if (e.key === "Enter" && !isComposing.current) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        {user} 채팅방
      </h2>

      {/* 채팅 메시지 섹션 */}
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

      {/* 로그 섹션 */}
      <div className="border p-4 h-32 overflow-y-auto mb-4 bg-white rounded">
        <h3 className="font-bold text-lg mb-2">로그</h3>
        {logs.map((log, index) => (
          <div key={index} className="text-xs text-gray-500">
            {log}
          </div>
        ))}
      </div>

      {/* 메시지 입력 및 전송 버튼 */}
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => (isComposing.current = true)} // 조합 시작
          onCompositionEnd={() => (isComposing.current = false)} // 조합 종료
          className="flex-grow border rounded-l px-4 py-2 focus:outline-none"
          placeholder="메시지를 입력하세요..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

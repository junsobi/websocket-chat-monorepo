import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { ChatBoxProps, Message } from "@/types/chat";
import ChatMessages from "./ChatMessages";
import LogViewer from "./LogViewer";
import MessageInput from "./MessageInput";
import { useWebSocket } from "@/hooks/useWebSocket";
import { loadInitialMessages } from "@/api/loadInitialMessages";

const ChatBox: React.FC<ChatBoxProps & { roomId: string }> = ({
  user,
  serverUrl,
  roomId,
}) => {
  const [input, setInput] = useState("");
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { messages, sendMessage, webSocketLogs } = useWebSocket(
    serverUrl,
    user
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      const { initialMessages, initialLogMessage } = await loadInitialMessages(
        roomId
      );
      setInitialMessages(initialMessages);

      if (initialLogMessage) {
        webSocketLogs.push(initialLogMessage);
      }
    };

    fetchInitialData();
  }, [roomId]);

  useEffect(() => {
    const chatContainer = document.getElementById(`${user}-chat-messages`);
    const logContainer = document.getElementById(`${user}-chat-logs`);
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
    if (logContainer) {
      logContainer.scrollTo({
        top: logContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [initialMessages, messages, user]);

  // 메시지 전송 핸들러
  const handleSendMessage = useCallback(() => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  }, [input, sendMessage]);

  // 초기 메시지와 WebSocket 메시지를 합친 배열
  const combinedMessages = useMemo(
    () => [...initialMessages, ...messages],
    [initialMessages, messages]
  );

  // 초기 로그와 WebSocket 로그를 합친 배열
  const combinedLogs = useMemo(() => [...webSocketLogs], [webSocketLogs]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        {user} 채팅방
      </h2>

      <ChatMessages
        user={user}
        messages={combinedMessages}
        messageEndRef={messageEndRef}
      />
      <LogViewer user={user} logs={combinedLogs} />
      <MessageInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatBox;

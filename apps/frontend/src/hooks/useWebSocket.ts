import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/chat";

export function useWebSocket(serverUrl: string, user: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [webSocketLogs, setWebSocketLogs] = useState<string[]>([]);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket 연결 설정
    socket.current = new WebSocket(serverUrl);

    socket.current.onopen = () => {
      const message = `${user} WebSocket 연결 성공!`;
      setWebSocketLogs((prev) => [...prev, message]);
    };

    socket.current.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.type === "history") {
        // 서버에서 전달된 이전 메시지 설정
        setMessages(parsedData.data);
        setWebSocketLogs((prev) => [
          ...prev,
          `이전 메시지 ${parsedData.data.length}개 로드 완료`,
        ]);
      } else if (parsedData.type === "message") {
        // 실시간 메시지 수신 처리 및 로그 추가
        setMessages((prev) => [...prev, parsedData.data]);
        setWebSocketLogs((prev) => [
          ...prev,
          `수신: ${parsedData.data.user} -> ${parsedData.data.text}`,
        ]);
      }
    };

    socket.current.onclose = () => {
      const message = `${user} WebSocket 연결 종료`;
      setWebSocketLogs((prev) => [...prev, message]);
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket 오류:", error);
      setWebSocketLogs((prev) => [...prev, "WebSocket 오류 발생"]);
    };

    return () => {
      socket.current?.close();
    };
  }, [serverUrl, user]);
  const sendMessage = (text: string) => {
    if (socket.current && text.trim()) {
      const message = { user, text, timestamp: new Date().toISOString() };
      socket.current.send(JSON.stringify(message));
      setWebSocketLogs((prev) => [...prev, `발신: ${user} -> ${text}`]);
    }
  };

  return { messages, sendMessage, webSocketLogs };
}

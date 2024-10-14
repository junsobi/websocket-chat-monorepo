import { useEffect, useRef, useState } from "react";

export function useWebSocket(serverUrl: string, user: string) {
  const [messages, setMessages] = useState<
    { user: string; text: string; timestamp: string }[]
  >([]);
  const [logs, setLogs] = useState<string[]>([]);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket 연결
    socket.current = new WebSocket(serverUrl);

    socket.current.onopen = () => {
      const message = `${user} WebSocket 연결 성공!`;
      setLogs((prev) => [...prev, message]);
    };

    socket.current.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.type === "history") {
        // 이전 메시지 불러오기
        setMessages(parsedData.data);
      } else if (parsedData.type === "message") {
        // 실시간 메시지 추가
        setMessages((prev) => [...prev, parsedData.data]);
      }
    };

    socket.current.onclose = () => {
      const message = `${user} WebSocket 연결 종료`;
      setLogs((prev) => [...prev, message]);
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };

    return () => {
      socket.current?.close();
    };
  }, [serverUrl, user]);

  const sendMessage = (text: string) => {
    if (socket.current && text.trim()) {
      const message = { user, text };
      socket.current.send(JSON.stringify(message));
    }
  };

  return { messages, logs, sendMessage };
}

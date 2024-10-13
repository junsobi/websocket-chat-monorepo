import { useEffect, useRef, useState } from "react";

export function useWebSocket(serverUrl: string, user: string) {
  const [messages, setMessages] = useState<string[]>([]);
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
      setMessages((prev) => [...prev, event.data]); // 수신된 메시지 추가
      setLogs((prev) => [...prev, `${user} 메시지 수신: ${event.data}`]);
    };

    socket.current.onclose = () => {
      const message = `${user} WebSocket 연결 종료`;
      setLogs((prev) => [...prev, message]);
    };

    return () => {
      socket.current?.close();
    };
  }, [serverUrl, user]);

  const sendMessage = (message: string) => {
    if (socket.current && message.trim()) {
      const formattedMessage = `${user}: ${message}`;
      socket.current.send(formattedMessage); // 서버에 메시지 전송
      setLogs((prev) => [...prev, `${user} 메시지 전송: ${formattedMessage}`]);
    }
  };

  return { messages, logs, sendMessage };
}

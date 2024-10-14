import { Message } from "@/types/chat";

export const useSendMessageApi = (
  roomId: string,
  addLog: (msg: string) => void
) => {
  const sendMessage = async (user: string, text: string) => {
    const message: Message = {
      user,
      text,
      timestamp: new Date().toISOString(),
    };
    try {
      await fetch(`http://localhost:4000/messages/${roomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      addLog(`메시지 전송: ${text}`);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      addLog("메시지 전송 실패");
    }
  };

  return { sendMessage };
};

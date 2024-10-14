import { fetchMessages } from "@/api/messages";
import { Message } from "@/types/chat";

interface LoadInitialMessagesResult {
  initialMessages: Message[];
  initialLogMessage: string;
}

export const loadInitialMessages = async (
  roomId: string
): Promise<LoadInitialMessagesResult> => {
  try {
    const data = await fetchMessages(roomId);
    const logMessage = `메시지 기록 수신 (${data.length}개)`;
    return { initialMessages: data, initialLogMessage: logMessage };
  } catch (error) {
    console.error("메시지 수신 실패:", error);
    return { initialMessages: [], initialLogMessage: "메시지 불러오기 실패" };
  }
};

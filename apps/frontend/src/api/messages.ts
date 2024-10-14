import apiClient from "@/lib/apiClient";
import { Message } from "@/types/chat";

export const fetchMessages = async (roomId: string): Promise<Message[]> => {
  const response = await apiClient.get(`/messages/${roomId}`);
  return response.data;
};

export const sendMessage = async (
  roomId: string,
  message: Message
): Promise<Message> => {
  const response = await apiClient.post(`/messages/${roomId}`, message);
  return response.data;
};

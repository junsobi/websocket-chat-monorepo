import { useState } from "react";
import { Message } from "@/types/chat";

export const useMessageState = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return { messages, addMessage, setMessages };
};

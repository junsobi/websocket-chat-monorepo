import React, { useRef } from "react";
import { MessageInputProps } from "@/types/chat";

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  handleSendMessage,
}) => {
  const isComposing = useRef(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing.current) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => (isComposing.current = true)}
        onCompositionEnd={() => (isComposing.current = false)}
        className=" border rounded-l px-4 py-2 focus:outline-none"
        placeholder="메시지를 입력하세요..."
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
      >
        전송
      </button>
    </div>
  );
};

export default MessageInput;

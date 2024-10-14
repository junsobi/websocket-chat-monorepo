/** 사용자 유형 정의 */
export type User = "User1" | "User2";

/** 단일 메시지 객체 타입 */
export interface Message {
  user: string;
  text: string;
  timestamp: string;
}

/** ChatMessages 컴포넌트의 props 타입 */
export interface ChatMessagesProps {
  messages: Message[];
  messageEndRef: React.RefObject<HTMLDivElement>;
}

/** LogViewer 컴포넌트의 props 타입 */
export interface LogViewerProps {
  logs: string[];
}

/** MessageInput 컴포넌트의 props 타입 */
export interface MessageInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}

/** ChatBox 컴포넌트의 props 타입 */
export interface ChatBoxProps {
  user: User;
  serverUrl: string;
}

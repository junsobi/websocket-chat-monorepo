import React from "react";
import ChatBox from "../components/ChatBox";

const Home: React.FC = () => {
  // 기본값 설정: 환경변수가 없을 경우 Render 서버 URL 사용
  const serverUrl =
    process.env.NEXT_PUBLIC_WEBSOCKET_URL ||
    "wss://websocket-chat-monorepo.onrender.com";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex w-3/4">
        <ChatBox user="User1" serverUrl={serverUrl} />
        <ChatBox user="User2" serverUrl={serverUrl} />
      </div>
    </div>
  );
};

export default Home;

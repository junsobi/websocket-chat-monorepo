import React from "react";
import ChatBox from "../components/ChatBox";

const Home: React.FC = () => {
  // 로컬 테스트용 WebSocket 서버 URL 설정
  const serverUrl =
    // "ws://localhost:4000"; // 로컬 서버에서 테스트
    process.env.NEXT_PUBLIC_WEBSOCKET_URL ||
    "wss://websocket-chat-monorepo.onrender.com"; // 배포된 서버 URL

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 flex flex-col">
      <header className="bg-blue-500 text-white text-center py-4 shadow-lg">
        <h1 className="text-3xl font-semibold">Real-Time WebSocket Chat</h1>
        <p className="text-sm mt-1">
          Communicate live with two independent users!
        </p>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="flex w-3/4 space-x-4">
          <ChatBox user="User1" serverUrl={serverUrl} />
          <ChatBox user="User2" serverUrl={serverUrl} />
        </div>
      </main>

      <footer className="bg-blue-500 text-white text-center py-2">
        <p>WebSocket Chat Application © 2024</p>
      </footer>
    </div>
  );
};

export default Home;

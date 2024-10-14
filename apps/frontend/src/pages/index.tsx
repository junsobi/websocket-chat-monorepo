import React from "react";
import ChatBox from "../components/ChatBox";

import { NextPageWithLayout } from "@/types/next";
import { User } from "@/types/chat";

const users: User[] = ["User1", "User2"]; // 유저 목록
const roomId = "room123"; // 테스트용 방 ID

const Home: NextPageWithLayout = () => {
  // 로컬 테스트용 WebSocket 서버 URL 설정
  const serverUrl =
    // `ws://localhost:4000?roomId=${roomId}`; // 로컬 서버에서 테스트
    process.env.NEXT_PUBLIC_WEBSOCKET_URL ||
    "wss://websocket-chat-monorepo.onrender.com"; // 배포된 서버 URL

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-center py-6 shadow-md">
        <h1 className="text-4xl font-extrabold tracking-tight">
          실시간 채팅 서비스
        </h1>
        <p className="text-md mt-2 font-light">
          두 명의 사용자가 실시간으로 소통할 수 있습니다 💬
        </p>
      </div>

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="flex gap-4 p-4 md:flex-row flex-col ">
          {users.map((user) => (
            <ChatBox
              key={user}
              user={user}
              serverUrl={serverUrl}
              roomId={roomId}
            />
          ))}
        </div>
      </main>

      <footer className="bg-blue-600 text-white text-center py-4">
        <p className="text-xs mt-1">
          &quot;언제 어디서든 실시간으로 소통하세요 📡&quot;
        </p>
      </footer>
    </div>
  );
};

export default Home;

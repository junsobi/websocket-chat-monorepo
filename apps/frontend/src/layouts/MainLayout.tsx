import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
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
      <div className="w-full">{children}</div>
    </main>

    <footer className="bg-blue-600 text-white text-center py-4">
      <p className="text-xs mt-1">
        &quot;언제 어디서든 실시간으로 소통하세요 📡&quot;
      </p>
    </footer>
  </div>
);

export default MainLayout;

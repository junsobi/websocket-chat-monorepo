import React from "react";
import { LogViewerProps } from "@/types/chat";

const LogViewer: React.FC<LogViewerProps> = ({ user, logs }) => {
  return (
    <div
      id={`${user}-chat-logs`}
      className="border p-4 h-32 overflow-y-auto mb-4 bg-white rounded"
    >
      <h3 className="font-bold text-lg mb-2">로그</h3>
      {logs.map((log, index) => (
        <div key={index} className="text-xs text-gray-500">
          {log}
        </div>
      ))}
    </div>
  );
};

export default LogViewer;

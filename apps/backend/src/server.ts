import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Message from "./models/message";

// 기본 MongoDB URI 설정 (`.env` 파일 없이 사용)
const DEFAULT_MONGO_URI =
  "mongodb+srv://junsobi:vNSD63mNjS5$qc9@clustermessage.ju00r.mongodb.net/?retryWrites=true&w=majority&appName=clusterMessage";

dotenv.config(); // 환경 변수 로드

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB 연결 설정
const MONGO_URI = process.env.MONGO_URI || DEFAULT_MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB에 연결되었습니다."))
  .catch((error) => console.error("MongoDB 연결 오류:", error));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", async (ws) => {
  console.log("클라이언트가 연결되었습니다.");

  // 이전 메시지 불러오기
  try {
    const previousMessages = await Message.find().sort({ timestamp: 1 });
    ws.send(
      JSON.stringify({
        type: "history",
        data: previousMessages,
      })
    );
  } catch (error) {
    console.error("이전 메시지 불러오기 오류:", error);
  }

  ws.on("message", async (data) => {
    try {
      const { user, text } = JSON.parse(data.toString());

      // MongoDB에 메시지 저장
      const newMessage = new Message({ user, text });
      await newMessage.save();
      console.log("메시지 저장:", newMessage);

      // 모든 클라이언트에게 메시지 전송
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(
            JSON.stringify({
              type: "message",
              data: { user, text, timestamp: new Date() },
            })
          );
        }
      });
    } catch (error) {
      console.error("메시지 처리 중 오류:", error);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket 오류 발생:", error);
  });

  ws.on("close", () => console.log("클라이언트 연결 종료"));
});

server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/router";
import { websocketHandler } from "./websocket/websocketHandler";
import cors from "cors";

// 기본 MongoDB URI 설정 (.env 파일 없이 사용 시)
const DEFAULT_MONGO_URI =
  "mongodb+srv://junsobi:vNSD63mNjS5$qc9@clustermessage.ju00r.mongodb.net/?retryWrites=true&w=majority&appName=clusterMessage";

dotenv.config(); // 환경 변수 로드

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || DEFAULT_MONGO_URI;

// MongoDB 연결 설정
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB에 연결되었습니다."))
  .catch((error) => console.error("MongoDB 연결 오류:", error));

// 미들웨어 설정
app.use(cors()); // CORS 미들웨어 사용
app.use(express.json());
app.use("/messages", router); // REST API 라우터 연결

// 서버와 WebSocket 설정
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

websocketHandler(wss); // WebSocket 핸들러 연결

server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

import { WebSocket, WebSocketServer } from "ws";
import Message from "../models/message";

export const websocketHandler = (wss: WebSocketServer) => {
  wss.on("connection", async (ws: WebSocket) => {
    console.log("클라이언트가 연결되었습니다.");

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
        const newMessage = new Message({ user, text });
        await newMessage.save();
        console.log("메시지 저장:", newMessage);

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
        console.error("메시지 처리 오류:", error);
      }
    });

    ws.on("error", (error) => console.error("WebSocket 오류 발생:", error));
    ws.on("close", () => console.log("클라이언트 연결 종료"));
  });
};

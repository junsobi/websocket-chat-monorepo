import { WebSocketServer, WebSocket } from "ws";
import Message from "../models/message";

export const websocketHandler = (wss: WebSocketServer) => {
  wss.on("connection", (ws: WebSocket, req) => {
    const roomId = new URL(
      req.url || "",
      `https://${req.headers.host}`
    ).searchParams.get("roomId");

    ws.on("message", async (data) => {
      const { user, text } = JSON.parse(data.toString());
      const newMessage = new Message({ user, text, roomId });
      await newMessage.save();

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "message",
              data: { user, text, timestamp: new Date(), roomId },
            })
          );
        }
      });
    });

    ws.on("close", () => console.log("클라이언트 연결 종료"));
  });
};

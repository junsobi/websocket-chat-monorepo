import { Router } from "express";
import Message from "../models/message";

const router = Router();

// 특정 방의 메시지 가져오기 (GET /messages/:roomId)
router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "메시지 목록을 불러오는 데 실패했습니다." });
  }
});

// 특정 방에 메시지 생성 (POST /messages/:roomId)
router.post("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { user, text } = req.body;
  try {
    const newMessage = new Message({ user, text, roomId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "메시지를 저장하는 데 실패했습니다." });
  }
});

export default router;

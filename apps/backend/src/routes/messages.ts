import { Router } from "express";
import Message from "../models/message";

//REST API 추가
const router = Router();

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "메시지 목록을 불러오는 데 실패했습니다." });
  }
});

// 메시지 생성 (POST /messages)
router.post("/", async (req, res) => {
  const { user, text } = req.body;
  try {
    const newMessage = new Message({ user, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "메시지를 저장하는 데 실패했습니다." });
  }
});

export default router;

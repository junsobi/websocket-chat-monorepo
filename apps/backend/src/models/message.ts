import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  user: string;
  text: string;
  timestamp: Date;
}

const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  roomId: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", messageSchema);
